import type {ParamListBase} from "@react-navigation/native"
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"

import type {Skill} from "../store/skills/SkillsStore"

export interface RootStackParamList {
  Loading: undefined
  Home: undefined
}

export interface WelcomeStackParamList {
  WelcomeScreen: undefined
  AuthScreen: undefined
}

export interface HomeStackParamList {
  HomeScreen: undefined
  PremiumScreen: undefined
  SkillInfoScreen: {
    id: Skill["id"],
  }
  CurrentWorkoutScreen: {
    date: number,
  }
  OptionsScreen: undefined
  AboutScreen: undefined
}

export type NavigationProps<
  Stack extends
        | RootStackParamList
        | WelcomeStackParamList
        | HomeStackParamList,
  ScreenName extends keyof Stack,
> = NativeStackScreenProps<Stack & ParamListBase, ScreenName>

export type HomeStackNavigationProp = NativeStackNavigationProp<
    HomeStackParamList & ParamListBase
>

export type RootNavigationParamList = RootStackParamList
    & HomeStackParamList
    & WelcomeStackParamList
    & ParamListBase

export type ScreensParamList = RootNavigationParamList
