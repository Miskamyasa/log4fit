import {createNavigationContainerRef, DarkTheme, DefaultTheme, StackActions} from "@react-navigation/native"
import {Theme} from "@react-navigation/native/src/types"
import {NativeStackNavigationOptions} from "@react-navigation/native-stack"

import {mainBackgroundColor} from "../colors/colors"
import {ColorSchemeName} from "../colors/types"

import {RootNavigationParamList as Params, RootNavigationParamList} from "./types"


type Screen = keyof Params

export const navigationRef = createNavigationContainerRef<Params>()

export const navigation = {
  navigate<T extends Screen, P extends Params[T]>(name: T, params: P): void {
    if (navigationRef.isReady()) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigationRef.navigate<keyof RootNavigationParamList>(name, params)
    }
  },
  replace<T extends Screen, P extends Params[T]>(name: T, params: P): void {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params))
    }
  },
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
}

export const defaultOptions: NativeStackNavigationOptions = {
  headerShown: false,
}
