import React, {ReactElement} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import {defaultOptions} from "./config";
import {HomeStackParamList} from "./types";


const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator(): ReactElement {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={defaultOptions} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavigator;
