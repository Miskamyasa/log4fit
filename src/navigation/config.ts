import {createNavigationContainerRef, DarkTheme, DefaultTheme} from "@react-navigation/native";
import {NativeStackNavigationOptions} from "@react-navigation/native-stack";
import {Theme} from "@react-navigation/native/src/types";

import {ColorSchemeName, mainBackgroundColor} from "../colors";
import {RootNavigationParamList} from "./types";


type ScreenName = keyof RootNavigationParamList;

export const navigationRef = createNavigationContainerRef<RootNavigationParamList>();

export function navigate<T extends ScreenName, P extends RootNavigationParamList[T]>(name: T, params: P): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

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
