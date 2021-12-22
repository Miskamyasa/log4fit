import {ReactElement, useCallback} from "react";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedButton from "../components/ThemedButton";
import {__t} from "../i18";
import {WelcomeStackScreenProps} from "../navigation/types";

function WelcomeScreen(props: WelcomeStackScreenProps<"WelcomeScreen">): ReactElement {
  const {navigation} = props;
  const goNext = useCallback(() => navigation.navigate("AuthScreen"), []);
  return (
    <ThemedView style={{padding: 50}}>
      <ThemedText>{__t("welcomeScreen.title")}</ThemedText>
      <ThemedButton onPress={goNext}>
        {__t("continue")}
      </ThemedButton>
    </ThemedView>
  );
}

export default WelcomeScreen;
