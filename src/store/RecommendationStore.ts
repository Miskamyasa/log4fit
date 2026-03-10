import {action, makeObservable, observable} from "mobx"

import {analytics} from "../helpers/analytics"

import type {RecommendationsResponse, SkillRecommendation} from "./schemas"
import type {Stores} from "./Stores"

const BACKOFF_DELAYS = [1000, 2000, 4000, 8000, 16000, 30000]

// Watchdog timeout: if no SSE activity (data or heartbeat) arrives within
// this window, reconnect. The server sends heartbeats every 30s, so 90s
// gives 3 missed heartbeats before considering the stream dead.
const STREAM_WATCHDOG_MS = 90000

export class RecommendationStore {
  constructor(private stores: Stores) {
    makeObservable(this)
  }

  @observable public recommendations: Record<string, SkillRecommendation> = {}
  @observable public loading = false
  @observable public connected = false

  private streamController: {close: () => void} | null = null
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null
  private watchdogTimeout: ReturnType<typeof setTimeout> | null = null
  private retryCount = 0
  private sessionId = 0

  @action
  private setRecommendations(payload: RecommendationsResponse): void {
    this.recommendations = payload.skills
  }

  @action
  private setLoading(loading: boolean): void {
    this.loading = loading
  }

  @action
  private setConnected(connected: boolean): void {
    this.connected = connected
  }

  @action
  public reset(): void {
    this.disconnect()
    this.recommendations = {}
    this.loading = false
    this.connected = false
  }

  public connect(): void {
    // Tear down any existing connection before opening a new one
    this.disconnect()
    this.sessionId += 1
    void this.fetchInitial(this.sessionId)
    this.openStream()
  }

  public disconnect(): void {
    this.sessionId += 1
    if (this.streamController) {
      this.streamController.close()
      this.streamController = null
    }
    this.setConnected(false)
    this.clearTimers()
  }

  private clearTimers(): void {
    if (this.reconnectTimeout !== null) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }
    if (this.watchdogTimeout !== null) {
      clearTimeout(this.watchdogTimeout)
      this.watchdogTimeout = null
    }
  }

  private async fetchInitial(session: number): Promise<void> {
    this.setLoading(true)
    try {
      const data = await this.stores.networkStore.fetchRecommendations()
      // Guard: if session changed (disconnect/reset called during fetch),
      // discard the stale response to avoid repopulating after logout.
      if (this.sessionId !== session) return
      if (data) {
        this.setRecommendations(data)
      }
    } catch (e) {
      analytics.trackError(e, {source: "RecommendationStore.fetchInitial"})
    } finally {
      if (this.sessionId === session) {
        this.setLoading(false)
      }
    }
  }

  private openStream(): void {
    const onData = (payload: RecommendationsResponse): void => {
      this.retryCount = 0
      this.setRecommendations(payload)
    }

    const onActivity = (): void => {
      // Reset the watchdog on any stream activity (data events or heartbeats)
      // so we only reconnect when the stream truly goes silent.
      this.armWatchdog()
    }

    this.streamController = this.stores.networkStore.streamRecommendations(
      onData,
      onActivity,
    )
    this.setConnected(true)
    this.armWatchdog()
  }

  /**
   * Arms (or re-arms) the stream watchdog. If no SSE activity arrives within
   * STREAM_WATCHDOG_MS, the stream is considered dead and scheduleReconnect
   * is called to reopen it with exponential backoff.
   */
  private armWatchdog(): void {
    if (this.watchdogTimeout !== null) {
      clearTimeout(this.watchdogTimeout)
    }
    this.watchdogTimeout = setTimeout(() => {
      this.watchdogTimeout = null
      this.scheduleReconnect()
    }, STREAM_WATCHDOG_MS)
  }

  private scheduleReconnect(): void {
    this.clearTimers()

    const delayIndex = Math.min(this.retryCount, BACKOFF_DELAYS.length - 1)
    const delay = BACKOFF_DELAYS[delayIndex]
    this.retryCount += 1

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectTimeout = null
      this.setConnected(false)
      if (this.streamController) {
        this.streamController.close()
        this.streamController = null
      }
      this.openStream()
    }, delay)
  }
}
