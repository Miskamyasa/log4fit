import {schemes} from "./colors"
import {ThemeProps, ColorNames} from "./types"
import {useColorScheme} from "./useColorScheme"


export function useThemeColor(colorName: ColorNames, props?: ThemeProps): string {
  const colorScheme = useColorScheme()
  return props && props[colorScheme] || schemes[colorScheme][colorName]
}
