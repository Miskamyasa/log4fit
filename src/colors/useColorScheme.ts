import {useColorScheme as useNativeColorScheme} from "react-native"

import type {ColorSchemeName} from "./types"

export function useColorScheme(): ColorSchemeName {
  return useNativeColorScheme() ?? "dark"
}
