import {createElement} from "react"

import {action, makeObservable, observable} from "mobx"

import {SyncConflictModal} from "../features/sync/SyncConflictModal"
import {analytics} from "../helpers/analytics"
import {storage} from "../helpers/storage"

import {migrateFromLegacyStorage} from "./migrations"
import {APP_VERSION, type AppSaveSnapshot, appSaveSchema, STORES_TO_SYNC, toAppSaveSnapshot} from "./schemas"
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

  public async save() {
    if (this.state !== "idle") {
      return
    }
    this.setState("saving")
    try {
      const now = Date.now()
      const snapshot = this.getSnapshot(now)
      await storage.setItem(SAVE_KEY, JSON.stringify(snapshot))
      this.lastSave = now
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

      // 2. Fetch backend snapshot (returns null if unauthenticated or error)
      const backendResponse = await this.stores.networkStore.restoreSnapshot()

      // 3. Decision matrix
      if (!localSnapshot && !backendResponse) {
        // Both empty — try legacy migration
        const legacy = await migrateFromLegacyStorage()
        if (legacy) {
          this.loadSnapshot(legacy)
          await this.saveLocal(legacy)
          void this.stores.networkStore.persistSnapshot(legacy)
        }
      } else if (!backendResponse && localSnapshot) {
        // Backend empty, local exists — load local + push to server
        this.loadSnapshot(localSnapshot)
        void this.stores.networkStore.persistSnapshot(localSnapshot)
      } else if (!localSnapshot && backendResponse) {
        // Local empty, backend exists — load backend + save locally
        const converted = toAppSaveSnapshot(backendResponse)
        this.loadSnapshot(converted)
        await this.saveLocal(converted)
      } else if (localSnapshot && backendResponse) {
        // Both exist — compare timestamps
        if (backendResponse.savedAt === localSnapshot.timestamp) {
          // Same — just load local
          this.loadSnapshot(localSnapshot)
        } else {
          // Conflict — show modal
          const choice = await this.resolveConflict()
          if (choice === "override") {
            // Use backend data
            const converted = toAppSaveSnapshot(backendResponse)
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
