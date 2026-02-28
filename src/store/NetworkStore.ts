import {addEventListener} from "@react-native-community/netinfo" // Import NetInfo from the correct package
import {action, makeObservable, observable} from "mobx"

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
}
