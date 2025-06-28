import {createNavigationContainerRef, DarkTheme, DefaultTheme, StackActions} from "@react-navigation/native"
import type {Theme} from "@react-navigation/native"
import {type NativeStackNavigationOptions} from "@react-navigation/native-stack"

import {mainBackgroundColor} from "../colors/colors"
import type {ColorSchemeName} from "../colors/types"

import type {RootNavigationParamList as Params, ScreensParamList} from "./types"

export type ScreenName = keyof ScreensParamList

export const navigationRef = createNavigationContainerRef<Params>()

export const navigation = {
    navigate<T extends ScreenName>(name: T, params: ScreensParamList[T]): void {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(StackActions.push(name, params))
        }
    },
    replace<T extends ScreenName>(name: T, params: ScreensParamList[T]): void {
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
