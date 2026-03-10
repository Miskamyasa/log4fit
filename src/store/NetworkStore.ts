import {addEventListener} from "@react-native-community/netinfo" // Import NetInfo from the correct package
import {action, makeObservable, observable} from "mobx"

import {analytics} from "../helpers/analytics"

import {recommendationsResponseSchema, syncGetResponseSchema, syncPostResponseSchema, toSyncRequest} from "./schemas"
import type {AppSaveSnapshot, RecommendationsResponse, SyncGetResponse, SyncPostResponse} from "./schemas"

export class NetworkStore {
  syncEndpoint: string
  recommendationsEndpoint: string
  streamEndpoint: string
  private getToken: (() => Promise<string | null>) | null = null

  constructor() {
    makeObservable(this)
    addEventListener((state) => {
      this.setIsOnline(!!state.isConnected)
    })

    const apiUrl = process.env.EXPO_PUBLIC_API_URL as string | undefined
    if (!apiUrl) {
      throw new Error("Sync endpoint URL is not defined")
    }

    this.syncEndpoint = `${apiUrl}/sync`
      .split("/")
      .filter(Boolean)
      .join("/") // Ensure no double slashes

    this.recommendationsEndpoint = `${apiUrl}/recommendations`
      .split("/")
      .filter(Boolean)
      .join("/") // Ensure no double slashes

    this.streamEndpoint = `${apiUrl}/recommendations/stream`
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
    const trace = new Error("NetworkStore.getAuthHeaders trace").stack
    try {
      const token = await this.getToken()
      if (!token) return null
      return {Authorization: `Bearer ${token}`}
    } catch (e) {
      analytics.trackError(e, {
        source: "NetworkStore.getAuthHeaders",
        trace,
      })
      return null
    }
  }

  public async persistSnapshot(snapshot: AppSaveSnapshot): Promise<SyncPostResponse | null> {
    const authHeaders = await this.getAuthHeaders()
    if (!authHeaders) return null
    const trace = new Error("NetworkStore.persistSnapshot trace").stack
    try {
      const response = await fetch(this.syncEndpoint, {
        method: "POST",
        headers: {"Content-Type": "application/json", ...authHeaders},
        body: JSON.stringify(toSyncRequest(snapshot)),
      })
      if (!response.ok) {
        const data: unknown = await response.json().catch(() => null)
        const parsedResponse = syncPostResponseSchema.safeParse(data)
        if (parsedResponse.success) {
          return parsedResponse.data
        }
        return null
      }
      const data: unknown = await response.json()
      return syncPostResponseSchema.parse(data)
    } catch (e) {
      analytics.trackError(e, {
        extra: {syncEndpoint: this.syncEndpoint},
        source: "NetworkStore.persistSnapshot",
        trace,
      })
      return null
    }
  }

  public async restoreSnapshot(): Promise<SyncGetResponse | null> {
    const authHeaders = await this.getAuthHeaders()
    if (!authHeaders) return null
    const trace = new Error("NetworkStore.restoreSnapshot trace").stack
    try {
      const response = await fetch(this.syncEndpoint, {headers: authHeaders})
      if (!response.ok) {
        throw new Error("Failed to restore snapshot")
      }
      const data: unknown = await response.json()
      return syncGetResponseSchema.parse(data)
    } catch (e) {
      analytics.trackError(e, {
        extra: {syncEndpoint: this.syncEndpoint},
        source: "NetworkStore.restoreSnapshot",
        trace,
      })
      return null
    }
  }

  public async fetchRecommendations(): Promise<RecommendationsResponse | null> {
    const authHeaders = await this.getAuthHeaders()
    if (!authHeaders) return null
    const trace = new Error("NetworkStore.fetchRecommendations trace").stack
    try {
      const response = await fetch(this.recommendationsEndpoint, {
        headers: {Accept: "application/json", ...authHeaders},
      })
      if (!response.ok) return null
      const data: unknown = await response.json()
      return recommendationsResponseSchema.parse(data)
    } catch (e) {
      analytics.trackError(e, {
        source: "NetworkStore.fetchRecommendations",
        trace,
      })
      return null
    }
  }

  public streamRecommendations(
    onData: (data: RecommendationsResponse) => void,
    onActivity?: () => void,
  ): {close: () => void} {
    const controller = new AbortController()

    const start = async (): Promise<void> => {
      const authHeaders = await this.getAuthHeaders()
      if (!authHeaders) return
      const trace = new Error("NetworkStore.streamRecommendations trace").stack
      try {
        const response = await fetch(this.streamEndpoint, {
          headers: {Accept: "text/event-stream", ...authHeaders},
          signal: controller.signal,
        })

        if (!response.ok || !response.body) return

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ""
        let chunk = await reader.read()

        while (!chunk.done) {
          buffer += decoder.decode(chunk.value, {stream: true})
          const messages = buffer.split("\n\n")
          buffer = messages.pop() ?? ""

          for (const message of messages) {
            const lines = message.split("\n")
            let eventType = ""
            let dataLine = ""

            for (const line of lines) {
              if (line.startsWith(":")) {
                onActivity?.()
                continue
              }
              if (line.startsWith("event:")) {
                eventType = line.slice("event:".length).trim()
              } else if (line.startsWith("data:")) {
                dataLine = line.slice("data:".length).trim()
              }
            }

            if (eventType !== "recommendation" || !dataLine) continue

            try {
              const parsed = recommendationsResponseSchema.safeParse(
                JSON.parse(dataLine) as unknown,
              )
              if (parsed.success) {
                onActivity?.()
                onData(parsed.data)
              } else {
                analytics.trackError(new Error("SSE schema validation error"), {
                  source: "NetworkStore.streamRecommendations",
                  trace,
                })
              }
            } catch (parseErr) {
              analytics.trackError(parseErr, {
                source: "NetworkStore.streamRecommendations",
                trace,
              })
            }
          }

          chunk = await reader.read()
        }
      } catch (e) {
        if (controller.signal.aborted) return
        analytics.trackError(e, {
          source: "NetworkStore.streamRecommendations",
          trace: new Error("NetworkStore.streamRecommendations trace").stack,
        })
      }
    }

    void start()
    return {close: () => {controller.abort()}}
  }
}
