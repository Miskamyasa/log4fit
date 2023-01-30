import {ReactElement} from "react"

import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import {useColorScheme} from "../colors/useColorScheme"
import analytics from "../helpers/analytics"
import {routingInstrumentation} from "../helpers/Sentry"
import {useAppSelector} from "../store"

import {defaultOptions, navigationRef, themes} from "./config"
import HomeStackNavigator from "./HomeStackNavigator"
import WelcomeStackNavigator from "./WelcomeStackNavigator"


const RootStack = createNativeStackNavigator()

let prevRouteName: string

function onStateChange(): void {
  const curr = navigationRef.getCurrentRoute()
  if (curr?.name) {
    const currRouteName = curr.name
    if (prevRouteName && prevRouteName !== currRouteName) {
      analytics.sendScreenChange(currRouteName, prevRouteName)
    }
    prevRouteName = currRouteName
  }
}

function onReady(): void {
  routingInstrumentation.registerNavigationContainer(navigationRef)
}

function Navigation(): ReactElement {
  const colorScheme = useColorScheme()
  const welcome = useAppSelector(state => state.common.welcome)

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
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
