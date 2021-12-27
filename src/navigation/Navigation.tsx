import {ReactElement} from "react";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {useColorScheme} from "../colors";
import LoadingScreen from "../screens/LoadingScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import {defaultOptions, themes} from "./config";
import HomeStackNavigator from "./HomeStackNavigator";
import linking from "./linking";
import {RootStackParamList} from "./types";
import WelcomeStackNavigator from "./WelcomeStackNavigator";


const RootStack = createNativeStackNavigator<RootStackParamList>();


function Navigation(): ReactElement {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer
      theme={themes[colorScheme]}
      linking={linking} >
      <RootStack.Navigator>
        <RootStack.Screen
          name="Loading"
          component={LoadingScreen}
          options={defaultOptions} />
        <RootStack.Screen
          name="Welcome"
          component={WelcomeStackNavigator}
          options={defaultOptions} />
        <RootStack.Screen
          name="Home"
          component={HomeStackNavigator}
          options={defaultOptions} />
        <RootStack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={defaultOptions} />
        {/*<RootStack.Group screenOptions={{presentation: "modal"}}>*/}
        {/*  <RootStack.Screen*/}
        {/*    name="Modal"*/}
        {/*    component={__ModalScreen} />*/}
        {/*</RootStack.Group>*/}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
