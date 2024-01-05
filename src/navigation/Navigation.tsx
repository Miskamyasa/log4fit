import {ReactElement} from "react"

import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import {useColorScheme} from "../colors/useColorScheme"
import {useAppSelector} from "../store"

import {defaultOptions, navigationRef, themes} from "./config"
import HomeStackNavigator from "./HomeStackNavigator"
import WelcomeStackNavigator from "./WelcomeStackNavigator"


const RootStack = createNativeStackNavigator()

// let prevRoute: { name: string, time: number } | undefined

function onStateChange(): void {
    return
    // const curr = navigationRef.getCurrentRoute()
    // if (curr?.name) {
    //     const currRoute = {name: curr.name, time: Date.now()}
    //     if (prevRoute?.name && prevRoute.name !== currRoute.name) {
    //         analytics.sendScreenChange(currRoute.name, prevRoute.name, (currRoute.time - prevRoute.time) / 1000)
    //     }
    //     prevRoute = currRoute
    // }
}

function Navigation(): ReactElement {
    const colorScheme = useColorScheme()
    const welcome = useAppSelector(state => state.common.welcome)

    return (
        <NavigationContainer
            ref={navigationRef}
            theme={themes[colorScheme]}
            onStateChange={onStateChange}>
            <RootStack.Navigator>
                {welcome ? (
                    <RootStack.Screen
                        component={WelcomeStackNavigator}
                        name="Welcome"
                        options={defaultOptions} />
                ) : (
                    <RootStack.Screen
                        component={HomeStackNavigator}
                        name="Home"
                        options={defaultOptions} />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
