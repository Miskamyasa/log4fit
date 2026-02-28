import {createElement} from "react"

import {action, makeObservable, observable} from "mobx"

import {SyncConflictModal} from "../features/sync/SyncConflictModal"
import {analytics} from "../helpers/analytics"
import {storage} from "../helpers/storage"

import {migrateFromLegacyStorage} from "./migrations"
import {APP_VERSION, appSaveSchema, STORES_TO_SYNC, toAppSaveSnapshot} from "./schemas"
import type {AppSaveSnapshot} from "./schemas"
import type {Stores} from "./Stores"

const SAVE_KEY = "app_save"

export class SyncStore {
  constructor(private stores: Stores) {
    makeObservable(this)
  }

  @observable state: "idle" | "saving" | "loading" | "error" = "idle"

  @action
  private setState(state: "idle" | "saving" | "loading" | "error"): void {
    this.state = state
  }

  @observable loaded = false

  @action
  private setLoaded(val: boolean): void {
    this.loaded = val
  }

  @observable lastSave = 0

  private remoteSaving = false
  private pendingRemoteSnapshot: AppSaveSnapshot | null = null

  public getSnapshot(timestamp: number): AppSaveSnapshot {
    return {
      version: APP_VERSION,
      timestamp,
      approachesStore: this.stores.approachesStore.getSnapshot(),
      skillsStore: this.stores.skillsStore.getSnapshot(),
      weightsStore: this.stores.weightsStore.getSnapshot(),
      workoutsStore: this.stores.workoutsStore.getSnapshot(),
    }
  }

  public loadSnapshot(snapshot: AppSaveSnapshot): void {
    for (const store of STORES_TO_SYNC) {
      this.stores[store].loadSnapshot(snapshot)
    }
  }

  public async save(): Promise<void> {
    if (this.state !== "idle") {
      return
    }
    this.setState("saving")
    try {
      const now = Date.now()
      const snapshot = this.getSnapshot(now)
      await storage.setItem(SAVE_KEY, JSON.stringify(snapshot))
      this.lastSave = now
      void this.saveRemote(snapshot)
    }
    catch (e) {
      analytics.trackError(e)
      this.setState("error")
      return
    }
    finally {
      this.setState("idle")
    }
  }

  private async saveRemote(snapshot: AppSaveSnapshot): Promise<void> {
    if (this.remoteSaving) {
      this.pendingRemoteSnapshot = snapshot
      return
    }
    this.remoteSaving = true
    try {
      const response = await this.stores.networkStore.persistSnapshot(snapshot)
      if (!response) return

      if (response.saved === "conflict") {
        const choice = await this.resolveConflict()
        if (choice === "override") {
          const converted = toAppSaveSnapshot(response.savedAt, response.serverSnapshot)
          this.loadSnapshot(converted)
          await this.saveLocal(converted)
        }
      }
    } catch (e) {
      analytics.trackError(e)
    } finally {
      this.remoteSaving = false
      const pending = this.pendingRemoteSnapshot
      if (pending) {
        this.pendingRemoteSnapshot = null
        void this.saveRemote(pending)
      }
    }
  }

  private resolveConflict(): Promise<"override" | "skip"> {
    return new Promise((resolve) => {
      const {portalStore} = this.stores
      portalStore.open(
        createElement(SyncConflictModal, {
          onOverride: () => {
            portalStore.close()
            resolve("override")
          },
          onSkip: () => {
            portalStore.close()
            resolve("skip")
          },
        }),
      )
    })
  }

  private async saveLocal(snapshot: AppSaveSnapshot): Promise<void> {
    await storage.setItem(SAVE_KEY, JSON.stringify(snapshot))
    this.lastSave = snapshot.timestamp
  }

  public async load(): Promise<void> {
    if (this.state !== "idle") return
    this.setState("loading")
    try {
      // 1. Read local snapshot
      const localData = await storage.getItem(SAVE_KEY)
      const localSnapshot = localData
        ? appSaveSchema.parse(JSON.parse(localData))
        : null

      // 2. Fetch backend response (null = network/auth error)
      const getResponse = await this.stores.networkStore.restoreSnapshot()

      // Extract server data (null when no-data or fetch failed)
      const backendData = getResponse?.serverSnapshot
        ? {savedAt: getResponse.savedAt, snapshot: getResponse.serverSnapshot}
        : null

      // 3. Decision matrix
      if (!localSnapshot && !backendData) {
        // Both empty — try legacy migration
        const legacy = await migrateFromLegacyStorage()
        if (legacy) {
          this.loadSnapshot(legacy)
          await this.saveLocal(legacy)
          void this.stores.networkStore.persistSnapshot(legacy)
        }
      } else if (!backendData && localSnapshot) {
        // Backend empty, local exists — load local + push to server
        this.loadSnapshot(localSnapshot)
        void this.stores.networkStore.persistSnapshot(localSnapshot)
      } else if (!localSnapshot && backendData) {
        // Local empty, backend exists — load backend + save locally
        const converted = toAppSaveSnapshot(backendData.savedAt, backendData.snapshot)
        this.loadSnapshot(converted)
        await this.saveLocal(converted)
      } else if (localSnapshot && backendData) {
        // Both exist — compare timestamps
        if (backendData.savedAt === localSnapshot.timestamp) {
          // Same — just load local
          this.loadSnapshot(localSnapshot)
        } else {
          // Conflict — show modal
          const choice = await this.resolveConflict()
          if (choice === "override") {
            // Use backend data
            const converted = toAppSaveSnapshot(backendData.savedAt, backendData.snapshot)
            this.loadSnapshot(converted)
            await this.saveLocal(converted)
          } else {
            // Keep local, push to server
            this.loadSnapshot(localSnapshot)
            void this.stores.networkStore.persistSnapshot(localSnapshot)
          }
        }
      }
    } catch (e) {
      analytics.trackError(e)
      this.setState("error")
      return
    } finally {
      this.setLoaded(true)
    }
    this.setState("idle")
  }

  public reset(): void {
    for (const store of STORES_TO_SYNC) {
      this.stores[store].reset()
    }
    const snapshot = this.getSnapshot(Date.now())
    void storage.setItem(SAVE_KEY, JSON.stringify(snapshot))
  }
}
