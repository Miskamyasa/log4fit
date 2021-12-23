import {NativeStackScreenProps} from "@react-navigation/native-stack";


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
  HomeScreen: undefined,
};

export type HomeStackScreenProps<
  ScreenName extends keyof HomeStackParamList
> = NativeStackScreenProps<
  HomeStackParamList,
  ScreenName
>;

export type RootStackParamList = {
  Welcome: WelcomeStackParamList,
  Home: HomeStackParamList,
  Modal: undefined,
  NotFound: undefined,
};
