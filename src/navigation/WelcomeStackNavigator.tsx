import {ReactElement} from "react"

import {createNativeStackNavigator} from "@react-navigation/native-stack"

import AuthScreen from "../screens/AuthScreen"
import WelcomeScreen from "../screens/WelcomeScreen"

import {defaultOptions} from "./config"
import {WelcomeStackParamList} from "./types"


const WelcomeStack = createNativeStackNavigator<WelcomeStackParamList>()

function WelcomeStackNavigator(): ReactElement {
    return (
        <WelcomeStack.Navigator initialRouteName="WelcomeScreen">
            <WelcomeStack.Screen
                component={WelcomeScreen}
                name="WelcomeScreen"
                options={defaultOptions} />
            <WelcomeStack.Screen
                component={AuthScreen}
                name="AuthScreen"
                options={defaultOptions} />
        </WelcomeStack.Navigator>
    )
}

export default WelcomeStackNavigator
