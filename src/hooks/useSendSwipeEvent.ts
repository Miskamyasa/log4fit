import {useCallback} from "react"
import type {NativeScrollEvent, NativeSyntheticEvent} from "react-native"

import {analytics} from "../helpers/analytics"

export function useSendSwipeEvent(name: string): (ev: NativeSyntheticEvent<NativeScrollEvent>) => void {
  const sendSwipeEvent = useCallback(({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    analytics.trackEvent(name, {
      content_offset: `${nativeEvent.contentOffset.x}x${nativeEvent.contentOffset.y}`,
      content_size: `${nativeEvent.contentSize.width}x${nativeEvent.contentSize.height}`,
      layout_measurement: `${nativeEvent.layoutMeasurement.width}x${nativeEvent.layoutMeasurement.height}`,
    })
  }, [name])

  return sendSwipeEvent
}
