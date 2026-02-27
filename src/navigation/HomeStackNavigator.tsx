import type {ReactElement} from "react"

import {useAuth} from "@clerk/clerk-expo"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import {AboutScreen} from "../screens/AboutScreen"
import {AuthScreen} from "../screens/AuthScreen"
import {CurrentWorkoutScreen} from "../screens/CurrentWorkoutScreen"
import {HomeScreen} from "../screens/HomeScreen"
import {OptionsScreen} from "../screens/OptionsScreen"
import {SkillInfoScreen} from "../screens/SkillInfoScreen"

import {defaultOptions} from "./config"
import type {HomeStackParamList} from "./types"

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

export function HomeStackNavigator(): ReactElement {
  const {isSignedIn} = useAuth()

  return (
    <HomeStack.Navigator initialRouteName={isSignedIn ? "HomeScreen" : "AuthScreen"}>
      <HomeStack.Screen
        component={AuthScreen}
        name="AuthScreen"
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
    </HomeStack.Navigator>
  )
}
