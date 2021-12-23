import {ReactElement, useCallback} from "react";
import {View} from "react-native";
import {useDispatch} from "react-redux";
import Button from "../components/Button";
import Screen from "../components/Screen";
import Span from "../components/Span";
import {__t} from "../i18";
import {WelcomeStackScreenProps} from "../navigation/types";
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
  }, [dispatch]);

  return (
    <Screen>
      <View style={{flex: 1}}>
        <Span>{__t("authScreen.title")}</Span>
        <Span>{__t("authScreen.description")}</Span>
      </View>

      <Button onPress={back}>
        {__t("back")}
      </Button>
      <View style={{marginTop: 10}} />
      <Button onPress={skip}>
        {__t("skip")}
      </Button>

    </Screen>
  );
}

export default AuthScreen;
