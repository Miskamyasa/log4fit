import {colors, ColorNames} from "../constants/Colors";
import {useColorScheme} from "./useColorScheme";

export type ThemeProps = {
  light?: string,
  dark?: string,
};

export function useThemeColor(colorName: ColorNames, props?: ThemeProps): string {
  const colorScheme = useColorScheme();
  return props && props[colorScheme] || colors[colorScheme][colorName];
}
