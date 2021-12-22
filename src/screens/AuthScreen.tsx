import {ReactElement, useCallback} from "react";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedButton from "../components/ThemedButton";
import {__t} from "../i18";
import {WelcomeStackScreenProps} from "../navigation/types";
import {useDispatch} from "react-redux";
import {welcomeComplete} from "../store/common/actions";

function AuthScreen(props: WelcomeStackScreenProps<"AuthScreen">): ReactElement {
  const {navigation} = props;

  const back = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const dispatch = useDispatch();
  const skip = useCallback(() => {
    dispatch(welcomeComplete());
  }, [navigation]);

  return (
    <ThemedView style={{padding: 50}}>
      <ThemedText>{__t("authScreen.title")}</ThemedText>
      <ThemedText>{__t("authScreen.description")}</ThemedText>
      <ThemedButton onPress={back}>
        {__t("back")}
      </ThemedButton>
      <ThemedButton onPress={skip}>
        {__t("skip")}
      </ThemedButton>
    </ThemedView>
  );
}

export default AuthScreen;
