import {useCallback} from "react"

import {navigation, type ScreenName} from "./config"
import type {ScreensParamList} from "./types"

export function useNavigate<T extends ScreenName>(
  name: T,
  replace?: boolean,
): (params: ScreensParamList[T]) => void {
  return useCallback((params: ScreensParamList[T]) => {
    if (replace) {
      navigation.replace(name, params)
    }
    else {
      navigation.navigate(name, params)
    }
  }, [name, replace])
}
