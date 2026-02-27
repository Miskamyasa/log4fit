import {useColorScheme as _useColorScheme} from "react-native"

import type {ColorSchemeName} from "./types"

export function useColorScheme(): ColorSchemeName {
  return _useColorScheme() ?? "dark"
}
