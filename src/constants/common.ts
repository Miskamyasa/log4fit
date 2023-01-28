import Constants from "expo-constants"
import {get} from "lodash"


export const appVersion = String(__DEV__
  ? get(Constants, "manifest.version", "Error")
  : get(Constants, "nativeAppVersion", "Error"))

export const limitWorkouts = 5
