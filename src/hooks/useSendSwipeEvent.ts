import {useCallback} from "react"
import {NativeScrollEvent, NativeSyntheticEvent} from "react-native"

import {pick} from "lodash"

import analytics from "../helpers/analytics"


const keys = ["contentOffset", "contentSize", "layoutMeasurement"]

export default function useSendSwipeEvent(name: string): (ev: NativeSyntheticEvent<NativeScrollEvent>) => void {
  const sendSwipeEvent = useCallback(({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    analytics.sendEvent(name, pick(nativeEvent, keys))
  }, [name])

  return sendSwipeEvent
}
