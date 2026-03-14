import {analytics} from "../helpers/analytics"

export class AnalyticsStore {
  public async init(): Promise<void> {
    await analytics.init()
  }

  public onAppBackground(): void {
    analytics.onAppBackground()
  }

  public setUserId(userId: string | null): void {
    analytics.setUserId(userId)
  }

  public startNewSession(): void {
    analytics.startNewSession()
  }
}
