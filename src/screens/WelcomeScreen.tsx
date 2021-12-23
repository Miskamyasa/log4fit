import {ReactElement, useCallback} from "react";
import {StyleSheet, TextStyle, View} from "react-native";
import Button from "../components/Button";
import Screen from "../components/Screen";
import Span from "../components/Span";
import {__t} from "../i18";
import {WelcomeStackScreenProps} from "../navigation/types";


function WelcomeScreen(props: WelcomeStackScreenProps<"WelcomeScreen">): ReactElement {
  const {navigation} = props;
  const goNext = useCallback(() => navigation.navigate("AuthScreen"), [navigation]);
  return (
    <Screen>
      <View style={{flex: 1}}>
        <Span>{__t("welcomeScreen.title")}</Span>
      </View>
      <Button onPress={goNext}>
        {__t("continue")}
      </Button>
    </Screen>
  );
}

export default WelcomeScreen;
