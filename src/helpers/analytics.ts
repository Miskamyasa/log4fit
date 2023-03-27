import firebaseAnalytics from "@react-native-firebase/analytics"


const sender = firebaseAnalytics()

class Analytics {
  sendEvent(eventName: string, params: Record<string, unknown> = {}): void {
    if (!__DEV__) {
      void sender.logEvent(eventName, params)
      return
    }
    // eslint-disable-next-line no-console
    console.log({
      eventName,
      params,
    })
  }

  sendScreenChange(currRoute: string, prevRoute: string): void {
    this.sendEvent("screen_change", {prevRoute, currRoute})
    if (!__DEV__) {
      void sender.logScreenView({
        screen_name: currRoute,
        screen_class: currRoute,
      })
    }
  }
}

const analytics = new Analytics()

export default analytics
