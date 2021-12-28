import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";


export type WelcomeStackParamList = {
  WelcomeScreen: undefined,
  AuthScreen: undefined,
};

export type WelcomeStackScreenProps<
  ScreenName extends keyof WelcomeStackParamList
> = NativeStackScreenProps<
  WelcomeStackParamList,
  ScreenName
>;

export type HomeStackParamList = {
  LoadingScreen: undefined,
  HomeScreen: undefined,
  ExercisesScreen: undefined,
  WorkoutScreen: undefined,
  OptionsScreen: undefined,
  AboutScreen: undefined,
};

export type HomeStackScreenProps<
  ScreenName extends keyof HomeStackParamList
> = NativeStackScreenProps<
  HomeStackParamList,
  ScreenName
>;

export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

export type RootStackParamList = {
  Welcome: undefined,
  Home: undefined,
};

export type RootNavigationParamList =
  & RootStackParamList
  & HomeStackParamList
  & WelcomeStackParamList
;
