import Constants from "expo-constants"
import {get} from "lodash"

export const appVersion = get(Constants, ["expoConfig", "version"], "Error")

export const defaultRepeats = 10

export const defaultWeight = 0

export const EMPTY_ARRAY: [] = [] as const
