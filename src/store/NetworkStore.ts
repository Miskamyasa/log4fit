import {addEventListener} from "@react-native-community/netinfo" // Import NetInfo from the correct package
import {action, makeObservable, observable} from "mobx"

import type {AppSaveSnapshot} from "./schemas"

export class NetworkStore {
  constructor() {
    makeObservable(this)
    addEventListener((state) => {
      this.setIsOnline(!!state.isConnected)
    })
  }

  @observable public isOnline = true
  @action
  private setIsOnline(value: boolean): void {
    this.isOnline = value
  }

  public printSnapshot(snapshot: AppSaveSnapshot): void {
    console.warn("[NetworkStore] snapshot:", snapshot)
  }
}
