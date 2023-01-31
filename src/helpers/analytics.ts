import {NativeScrollEvent, NativeSyntheticEvent} from "react-native"

import {IS_MISKAMYASA} from "@env"
import firebaseAnalytics from "@react-native-firebase/analytics"
import {pick} from "lodash"


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

  sendSwipeEvent(eventName: string, {nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>): void {
    this.sendEvent(eventName, pick(nativeEvent, ["contentOffset", "contentSize", "layoutMeasurement"]))
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
