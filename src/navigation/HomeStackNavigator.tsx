import {ReactElement} from "react"

import {createNativeStackNavigator} from "@react-navigation/native-stack"

import AboutScreen from "../screens/AboutScreen"
import CurrentWorkoutScreen from "../screens/CurrentWorkoutScreen"
import HomeScreen from "../screens/HomeScreen"
import LoadingScreen from "../screens/LoadingScreen"
import OptionsScreen from "../screens/OptionsScreen"
import PremiumScreen from "../screens/PremiumScreen"
import SkillInfoScreen from "../screens/SkillInfoScreen"

import {defaultOptions} from "./config"
import {HomeStackParamList} from "./types"


const HomeStack = createNativeStackNavigator<HomeStackParamList>()

function HomeStackNavigator(): ReactElement {
  return (
    <HomeStack.Navigator initialRouteName="LoadingScreen">
      <HomeStack.Screen
        component={LoadingScreen}
        name="LoadingScreen"
        options={defaultOptions} />
      <HomeStack.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={defaultOptions} />
      <HomeStack.Screen
        component={SkillInfoScreen}
        name="SkillInfoScreen"
        options={defaultOptions} />
      <HomeStack.Screen
        component={CurrentWorkoutScreen}
        name="CurrentWorkoutScreen"
        options={defaultOptions} />
      <HomeStack.Screen
        component={OptionsScreen}
        name="OptionsScreen"
        options={defaultOptions} />
      <HomeStack.Screen
        component={AboutScreen}
        name="AboutScreen"
        options={defaultOptions} />
      <HomeStack.Screen
        component={PremiumScreen}
        name="PremiumScreen"
        options={defaultOptions} />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator
