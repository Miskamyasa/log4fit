import {ReactElement} from "react";
import {useSelector} from "react-redux";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useColorScheme} from "../hooks/useColorScheme";
import {AppState} from "../store/types";
import {defaultOptions} from "./config";
import HomeStackNavigator from "./HomeStackNavigator";
import {RootStackParamList} from "./types";
import WelcomeStackNavigator from "./WelcomeStackNavigator";


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
