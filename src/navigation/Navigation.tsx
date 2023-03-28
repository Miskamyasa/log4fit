import {ReactElement} from "react"

import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import {useColorScheme} from "../colors/useColorScheme"
import analytics from "../helpers/analytics"
import {useAppSelector} from "../store"

import {defaultOptions, navigationRef, themes} from "./config"
import HomeStackNavigator from "./HomeStackNavigator"
import WelcomeStackNavigator from "./WelcomeStackNavigator"


const RootStack = createNativeStackNavigator()

let prevRoute: { name: string, time: number } | undefined

function onStateChange(): void {
  const curr = navigationRef.getCurrentRoute()
  if (curr?.name) {
    const currRoute = {name: curr.name, time: Date.now()}
    if (prevRoute?.name && prevRoute.name !== currRoute.name) {
      analytics.sendScreenChange(currRoute.name, prevRoute.name, (currRoute.time - prevRoute.time) / 1000)
    }
    prevRoute = currRoute
  }
}

function Navigation(): ReactElement {
  const colorScheme = useColorScheme()
  const welcome = useAppSelector(state => state.common.welcome)

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={onStateChange}
      theme={themes[colorScheme]}>
      <RootStack.Navigator>
        {welcome ? (
          <RootStack.Screen
            name="Welcome"
            component={WelcomeStackNavigator}
            options={defaultOptions} />
        ) : (
          <RootStack.Screen
            name="Home"
            component={HomeStackNavigator}
            options={defaultOptions} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
