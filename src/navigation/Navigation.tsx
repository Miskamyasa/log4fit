import {ReactElement} from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {useColorScheme} from "../colors";
import {useAppSelector} from "../store";
import {defaultOptions, themes} from "./config";
import HomeStackNavigator from "./HomeStackNavigator";
import {RootStackParamList} from "./types";
import WelcomeStackNavigator from "./WelcomeStackNavigator";


const RootStack = createNativeStackNavigator<RootStackParamList>();


function Navigation(): ReactElement {
  const colorScheme = useColorScheme();
  const welcome = useAppSelector(state => state.common.welcome);

  return (
    <NavigationContainer theme={themes[colorScheme]}>
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
  );
}

export default Navigation;
