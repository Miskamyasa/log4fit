import {ColorSchemeName as SchemeName, useColorScheme as _useColorScheme} from "react-native";

export type ColorSchemeName = NonNullable<SchemeName>;

export function useColorScheme(): ColorSchemeName {
  return _useColorScheme() || "dark";
}
