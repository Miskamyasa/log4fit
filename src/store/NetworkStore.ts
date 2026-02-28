import {addEventListener} from "@react-native-community/netinfo" // Import NetInfo from the correct package
import {action, makeObservable, observable} from "mobx"

import type {AppSaveSnapshot} from "./schemas"

export class NetworkStore {
  syncEndpoint: string

  constructor() {
    makeObservable(this)
    addEventListener((state) => {
      this.setIsOnline(!!state.isConnected)
    })

    const apiUrl = String(process.env.EXPO_PUBLIC_API_URL)
    if (!apiUrl) {
      throw new Error("Sync endpoint URL is not defined")
    }

    this.syncEndpoint = `${apiUrl}/sync`
      .split("/")
      .filter(Boolean)
      .join("/") // Ensure no double slashes
  }

  @observable public isOnline = true
  @action
  private setIsOnline(value: boolean): void {
    this.isOnline = value
  }

  public async persistSnapshot(snapshot: AppSaveSnapshot): Promise<void> {
    try {
      const response = await fetch(this.syncEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snapshot),
      })
      if (!response.ok) {
        throw new Error("Failed to persist snapshot")
      }
      const data: unknown = await response.json()
      // eslint-disable-next-line no-console
      console.log("Snapshot persisted successfully:", data)
    } catch (error: unknown) {
      console.error("Error persisting snapshot:", error)
    }
  }

  public async restoreSnapshot(): Promise<unknown> {
    try {
      const response = await fetch(this.syncEndpoint)
      if (!response.ok) {
        throw new Error("Failed to restore snapshot")
      }
      const data: unknown = await response.json()
      // eslint-disable-next-line no-console
      console.log("Snapshot restored successfully:", data)
      return data
    } catch (error: unknown) {
      console.error("Error restoring snapshot:", error)
      return null
    }
  }
}
