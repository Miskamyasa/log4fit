import {action, makeObservable, observable} from "mobx"

import {analytics} from "../helpers/analytics"

import type {RecommendationsResponse, SkillRecommendation} from "./schemas"
import type {Stores} from "./Stores"

export class RecommendationStore {
  constructor(private stores: Stores) {
    makeObservable(this)
  }

  @observable public recommendations: Record<string, SkillRecommendation> = {}
  @observable public loading = false
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
  public reset(): void {
    this.sessionId += 1
    this.recommendations = {}
    this.loading = false
  }

  public fetch(): void {
    this.sessionId += 1
    void this.doFetch(this.sessionId)
  }

  private async doFetch(session: number): Promise<void> {
    this.setLoading(true)
    try {
      const data = await this.stores.networkStore.fetchRecommendations()
      if (this.sessionId !== session) return
      if (data) {
        this.setRecommendations(data)
      }
    }
    catch (e) {
      analytics.trackError(e, {source: "RecommendationStore.fetch"})
    }
    finally {
      if (this.sessionId === session) {
        this.setLoading(false)
      }
    }
  }
}
