import {AppState, type AppStateStatus} from "react-native"

import {action, computed, makeObservable, observable} from "mobx"

import type {Stores} from "./Stores"

export class AppStateStore {
  constructor(private stores: Stores) {
    makeObservable(this)
    AppState.addEventListener("change", (state) => {
      this.setState(state)
    })
  }

  @computed
  get storesReady(): boolean {
    return this.stores.welcomeStore.ready
      && this.stores.syncStore.loaded
  }

  @observable public state: AppStateStatus = AppState.currentState
  @action
  private setState(value: AppStateStatus): void {
    this.state = value
  }
}
