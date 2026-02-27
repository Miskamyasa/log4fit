import {type RouteProp, useRoute} from "@react-navigation/native"

import {type ScreensParamList} from "./types"

export function useParams<Screen extends keyof ScreensParamList>(): Readonly<ScreensParamList[Screen]> {
  const {params} = useRoute<RouteProp<ScreensParamList, Screen>>()

  if (!params) {
    throw new Error("useParams: params are undefined")
  }

  return params
}
