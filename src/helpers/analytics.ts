import firebaseAnalytics from "@react-native-firebase/analytics"


class Analytics {
  sender = firebaseAnalytics()

  sendEvent = (eventName: string, params: Record<string, unknown> = {}): void => {
    void this.sender.logEvent(eventName, params)
  }

  sendScreenChange = (routeName: string): void => {
    void this.sender.logScreenView({
      screen_name: routeName,
      screen_class: routeName,
    })
  }
}

const analytics = new Analytics()

export default analytics
