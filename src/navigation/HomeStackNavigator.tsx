import {useEffect} from "react"

import {useAuth} from "@clerk/clerk-expo"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import {AboutScreen} from "../screens/AboutScreen"
import {AuthScreen} from "../screens/AuthScreen"
import {CurrentWorkoutScreen} from "../screens/CurrentWorkoutScreen"
import {HomeScreen} from "../screens/HomeScreen"
import {SkillInfoScreen} from "../screens/SkillInfoScreen"
import {StatsScreen} from "../screens/StatsScreen"

import {defaultOptions} from "./config"
import type {HomeStackParamList} from "./types"
import {useNavigate} from "./useNavigate"

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

export function HomeStackNavigator() {
  const {isSignedIn} = useAuth()

  const auth = useNavigate("AuthScreen")

  useEffect(() => {
    if (!isSignedIn) {
      auth(undefined)
    }
  }, [isSignedIn, auth])

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
        component={StatsScreen}
        name="StatsScreen"
        options={defaultOptions} />
      {/* <HomeStack.Screen
        component={OptionsScreen}
        name="OptionsScreen"
        options={defaultOptions} /> */}
      <HomeStack.Screen
        component={AboutScreen}
        name="AboutScreen"
        options={defaultOptions} />
    </HomeStack.Navigator>
  )
}
