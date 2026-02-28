import {action, computed, makeObservable, observable} from "mobx"

import type {Stores} from "./Stores"

type StoreName = keyof Omit<Stores, "appStateStore" | "syncStore" | "networkStore" | "portalStore" | "welcomeStore">

export class SyncStore {
  constructor(private stores: Stores) {
    makeObservable(this)
  }

  @observable state: "idle" | "saving" | "loading" | "error" = "idle"

  @observable dirty = new Set<StoreName>([])
  @action
  public markDirty(s: StoreName): void {
    this.dirty.add(s)
  }

  @computed
  get isDirty(): boolean {
    return this.dirty.size > 0
  }
}
