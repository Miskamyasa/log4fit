import {action, makeObservable, observable} from "mobx"

import {analytics} from "../helpers/analytics"
import {storage} from "../helpers/storage"

import {type AppSaveSnapshot, appSaveSchema, STORES_TO_SYNC} from "./schemas"
import type {Stores} from "./Stores"

const SAVE_KEY = "app_save"
const APP_VERSION = "1.0.0"

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

  public async load(): Promise<void> {
    if (this.state !== "idle") {
      return
    }
    this.setState("loading")
    try {
      const data = await storage.getItem(SAVE_KEY)
      if (data) {
        const snapshot = appSaveSchema.parse(JSON.parse(data))
        this.loadSnapshot(snapshot)
      }
    }
    catch (e) {
      analytics.trackError(e)
      this.setState("error")
      return
    }
    finally {
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
