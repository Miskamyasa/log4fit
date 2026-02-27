import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"

import type {Skill} from "../store/skills/SkillsStore"

export type RootStackParamList = {
  Loading: undefined,
  Home: undefined,
}

export type WelcomeStackParamList = {
  WelcomeScreen: undefined,
}

export type HomeStackParamList = {
  AuthScreen: undefined,
  HomeScreen: undefined,
  PremiumScreen: undefined,
  SkillInfoScreen: {
    id: Skill["id"],
  },
  CurrentWorkoutScreen: {
    date: number,
  },
  OptionsScreen: undefined,
  AboutScreen: undefined,
}

export type NavigationProps<
  Stack extends
  | RootStackParamList
  | WelcomeStackParamList
  | HomeStackParamList,
  ScreenName extends keyof Stack,
> = NativeStackScreenProps<Stack, ScreenName>

export type HomeStackNavigationProp = NativeStackNavigationProp<
  HomeStackParamList
>

export type RootNavigationParamList = RootStackParamList
  & HomeStackParamList
  & WelcomeStackParamList

export type ScreensParamList = RootNavigationParamList
