/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import {LinkingOptions} from "@react-navigation/native";
import * as Linking from "expo-linking";

import {RootStackParamList} from "./types";


const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Loading: "/",
      Welcome: {
        screens: {
          WelcomeScreen: "welcome",
          AuthScreen: "auth",
        },
      },
      Home: {
        path: "home",
        screens: {
          HomeScreen: "",
          OptionsScreen: "options",
          AboutScreen: "about",
          WorkoutScreen: "workout",
          ExercisesScreen: "exercises",
        },
      },
      // Modal: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
