import {ReactElement, useRef} from "react"

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

function Navigation(): ReactElement {
  const colorScheme = useColorScheme()
  const welcome = useAppSelector(state => state.common.welcome)

  const prevNameRef = useRef<string>()

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={(): void => {
        routingInstrumentation.registerNavigationContainer(navigationRef)
      }}
      onStateChange={(): void => {
        const curr = navigationRef.getCurrentRoute()

        if (curr) {
          const prevRouteName = prevNameRef.current
          const currRouteName = curr.name

          if (prevRouteName !== currRouteName) {
            analytics.sendScreenChange(currRouteName)
          }

          prevNameRef.current = currRouteName
        }
      }}
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
