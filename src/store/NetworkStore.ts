import {addEventListener} from "@react-native-community/netinfo" // Import NetInfo from the correct package
import {action, makeObservable, observable} from "mobx"

import {analytics} from "../helpers/analytics"

import {backendResponseSchema} from "./schemas"
import type {AppSaveSnapshot,BackendResponse} from "./schemas"

export class NetworkStore {
  syncEndpoint: string
  private getToken: (() => Promise<string | null>) | null = null

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

  public setTokenGetter(fn: () => Promise<string | null>): void {
    this.getToken = fn
  }

  private async getAuthHeaders(): Promise<Record<string, string> | null> {
    if (!this.getToken) return null
    try {
      const token = await this.getToken()
      if (!token) return null
      return {Authorization: `Bearer ${token}`}
    } catch (e) {
      analytics.trackError(e)
      return null
    }
  }

  public async persistSnapshot(snapshot: AppSaveSnapshot): Promise<BackendResponse | null> {
    const authHeaders = await this.getAuthHeaders()
    if (!authHeaders) return null
    try {
      const response = await fetch(this.syncEndpoint, {
        method: "POST",
        headers: {"Content-Type": "application/json", ...authHeaders},
        body: JSON.stringify(snapshot),
      })
      if (!response.ok) {
        throw new Error("Failed to persist snapshot")
      }
      const data: unknown = await response.json()
      return backendResponseSchema.parse(data)
    } catch (e) {
      analytics.trackError(e)
      return null
    }
  }

  public async restoreSnapshot(): Promise<BackendResponse | null> {
    const authHeaders = await this.getAuthHeaders()
    if (!authHeaders) return null
    try {
      const response = await fetch(this.syncEndpoint, {headers: authHeaders})
      if (!response.ok) {
        throw new Error("Failed to restore snapshot")
      }
      const data: unknown = await response.json()
      return backendResponseSchema.parse(data)
    } catch (e) {
      analytics.trackError(e)
      return null
    }
  }
}
