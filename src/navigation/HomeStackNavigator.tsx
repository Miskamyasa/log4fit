import React, {ReactElement} from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";

import AboutScreen from "../screens/AboutScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import HomeScreen from "../screens/HomeScreen";
import LoadingScreen from "../screens/LoadingScreen";
import OptionsScreen from "../screens/OptionsScreen";
import {defaultOptions} from "./config";
import {HomeStackParamList} from "./types";


const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator(): ReactElement {
  return (
    <HomeStack.Navigator initialRouteName="LoadingScreen">
      <HomeStack.Screen
        name="LoadingScreen"
        component={LoadingScreen}
        options={defaultOptions} />
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
