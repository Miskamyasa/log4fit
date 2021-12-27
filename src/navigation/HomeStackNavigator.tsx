import React, {ReactElement} from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import AboutScreen from "../screens/AboutScreen";
import HomeScreen from "../screens/HomeScreen";
import OptionsScreen from "../screens/OptionsScreen";
import {defaultOptions} from "./config";
import {HomeStackParamList} from "./types";
import ExercisesScreen from "../screens/ExercisesScreen";


const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator(): ReactElement {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={defaultOptions} />
      <HomeStack.Screen
        name="ExercisesScreen"
        component={ExercisesScreen}
        options={defaultOptions} />
      <HomeStack.Screen
        name="OptionsScreen"
        component={OptionsScreen}
        options={defaultOptions} />
      <HomeStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={defaultOptions} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
