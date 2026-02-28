import {action, makeObservable, observable} from "mobx"
import {z} from "zod"

import type {AppSaveSnapshot, WeightsSnapshot} from "./schemas"
import {weightsSnapshotSchema} from "./schemas"
import type {Stores} from "./Stores"

export const weights = z.enum(["1", "2", "5", "10"])
export type WeightSteps = z.infer<typeof weights>

export class WeightsStore {
  constructor(private stores: Stores) {
    makeObservable(this)
  }

  @observable public settings: Record<string, WeightSteps> = {}
  @action
  public setSettings(settings: Record<string, WeightSteps>): void {
    for (const [id, value] of Object.entries(settings)) {
      this.settings[id] = value
    }
    this.stores.syncStore.markDirty("weightsStore")
  }

  public getSnapshot(): WeightsSnapshot {
    return {...this.settings}
  }

  public loadSnapshot(snapshot: AppSaveSnapshot): void {
    const validated = weightsSnapshotSchema.parse(snapshot.weightsStore)
    this.settings = validated
  }

  public reset(): void {
    this.settings = {}
  }
}
