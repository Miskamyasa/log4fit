import segmentClient from "./segment"


class Analytics {
  sendEvent(eventName: string, params: Record<string, any> = {}): void {
    if (!__DEV__) {
      void segmentClient.track(eventName, params)
    }
  }

  sendScreenChange(currRoute: string, time: number): void {
    if (!__DEV__) {
      void segmentClient.screen(currRoute, {time})
    }
  }
}

const analytics = new Analytics()

export default analytics
