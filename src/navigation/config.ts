import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {NativeStackNavigationOptions} from "@react-navigation/native-stack";
import {Theme} from "@react-navigation/native/src/types";

import {ColorSchemeName, mainBackgroundColor} from "../colors";


export const themes: Record<ColorSchemeName, Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: mainBackgroundColor,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: mainBackgroundColor,
    },
  },
};

export const defaultOptions: NativeStackNavigationOptions = {
  headerShown: false,
};
