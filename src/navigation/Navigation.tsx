import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {observer} from "mobx-react"

import {useColorScheme} from "../colors/useColorScheme"
import {LoadingScreen} from "../screens/LoadingScreen"
import {useStores} from "../store/useStores"

import {defaultOptions, navigationRef, themes} from "./config"
import {HomeStackNavigator} from "./HomeStackNavigator"
import type {RootNavigationParamList} from "./types"
import {WelcomeStackNavigator} from "./WelcomeStackNavigator"

const RootStack = createNativeStackNavigator<RootNavigationParamList>()

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

export const Navigation = observer(function Navigation() {
    const {welcomeStore} = useStores()
    const colorScheme = useColorScheme()

    return (
        <NavigationContainer
            ref={navigationRef}
            theme={themes[colorScheme]}
            onStateChange={onStateChange}>
            <RootStack.Navigator initialRouteName="Loading">
                <RootStack.Screen
                    component={LoadingScreen}
                    name="Loading"
                    options={defaultOptions} />
                {welcomeStore.welcome
                    ? (
                        <RootStack.Screen
                            component={HomeStackNavigator}
                            name="Home"
                            options={defaultOptions} />
                    )
                    : (
                        <RootStack.Screen
                            component={WelcomeStackNavigator}
                            name="Home"
                            options={defaultOptions} />
                    )}
            </RootStack.Navigator>
        </NavigationContainer>
    )
})
