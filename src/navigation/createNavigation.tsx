import {ReactElement} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {defaultOptions} from "./config";
import {RootRouteNames, RootStackParamList} from "./types";
import WelcomeStackNavigator from "./WelcomeStackNavigator";
import {useColorScheme} from "../hooks/useColorScheme";
import HomeStackNavigator from "./HomeStackNavigator";
import {useSelector} from "react-redux";
import {AppState} from "../store/types";

const RootStack = createNativeStackNavigator<RootStackParamList>();

function createNavigation() {
  return function Navigation(): ReactElement {
    const colorScheme = useColorScheme();
    const welcome = useSelector((state: AppState) => state.common.welcome);
    return (
      <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
          {/*<RootStack.Group screenOptions={{presentation: "modal"}}>*/}
          {/*  <RootStack.Screen*/}
          {/*    name="Modal"*/}
          {/*    component={__ModalScreen} />*/}
          {/*</RootStack.Group>*/}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  };
}

export default createNavigation;
