import {IS_MISKAMYASA} from "@env"
import firebaseAnalytics from "@react-native-firebase/analytics"


class Analytics {
  sender = firebaseAnalytics()

  sendEvent(eventName: string, params: Record<string, unknown> = {}): void {
    if (!__DEV__) {
      void this.sender.logEvent(eventName, params)
    }
    if (IS_MISKAMYASA) {
      // eslint-disable-next-line no-console
      // console.debug({
      //   eventName,
      //   params,
      // })
    }
  }

  sendScreenChange(currRoute: string, prevRoute: string): void {
    this.sendEvent("screen_change", {prevRoute, currRoute})
    if (!__DEV__) {
      void this.sender.logScreenView({
        screen_name: currRoute,
        screen_class: currRoute,
      })
    }
  }
}

const analytics = new Analytics()

export default analytics
