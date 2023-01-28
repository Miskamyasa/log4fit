import {ReactElement} from "react"

import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import {useColorScheme} from "../colors/useColorScheme"
import {routingInstrumentation} from "../helpers/Sentry"
import {useAppSelector} from "../store"

import {defaultOptions, navigationRef, themes} from "./config"
import HomeStackNavigator from "./HomeStackNavigator"
import WelcomeStackNavigator from "./WelcomeStackNavigator"


const RootStack = createNativeStackNavigator()

function onReady(): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  routingInstrumentation.registerNavigationContainer(navigationRef)
}

function Navigation(): ReactElement {
  const colorScheme = useColorScheme()
  const welcome = useAppSelector(state => state.common.welcome)

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
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
