import Constants from "expo-constants"
import {get} from "lodash"

export const appVersion = String(__DEV__
    ? get(Constants, "expoConfig.version", "Error")
    : get(Constants, "nativeAppVersion", "Error"))

export const defaultRepeats = 10

export const defaultWeight = 0

export const EMPTY_ARRAY: [] = [] as const
