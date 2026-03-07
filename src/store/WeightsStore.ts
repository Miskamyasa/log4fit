import {action, makeObservable, observable, runInAction} from "mobx"
import {z} from "zod"

import {analytics} from "../helpers/analytics"
import {storage} from "../helpers/storage"

import {weightsSnapshotSchema} from "./schemas"

const STORAGE_KEY = "weight_steps"

export const weights = z.enum(["1", "2", "5", "10"])
export type WeightSteps = z.infer<typeof weights>

export class WeightsStore {
  constructor() {
    makeObservable(this)
    void this.init()
  }

  @observable public ready = false
  @action
  private setReady(bool: boolean): void {
    this.ready = bool
  }

  @observable public settings: Record<string, WeightSteps> = {}
  @action
  public setSettings(settings: Record<string, WeightSteps>): void {
    for (const [id, value] of Object.entries(settings)) {
      this.settings[id] = value
    }
    void storage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
  }

  private async init(): Promise<void> {
    try {
      const raw = await storage.getItem(STORAGE_KEY)
      if (raw !== undefined) {
        const validated = weightsSnapshotSchema.parse(JSON.parse(raw))
        runInAction(() => {
          this.settings = validated
        })
      } else {
        // Migrate from app_save blob if weight_steps doesn't exist yet
        const appSave = await storage.getItem("app_save")
        if (appSave !== undefined) {
          const parsed: unknown = JSON.parse(appSave)
          if (typeof parsed === "object" && parsed !== null && "weightsStore" in parsed) {
            const data = (parsed as Record<string, unknown>).weightsStore
            const validated = weightsSnapshotSchema.parse(data)
            runInAction(() => {
              this.settings = validated
            })
            void storage.setItem(STORAGE_KEY, JSON.stringify(validated))
          }
        }
      }
    }
    catch (e) {
      analytics.trackError(e)
    }
    finally {
      this.setReady(true)
    }
  }
}
