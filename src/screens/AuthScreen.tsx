import {Fragment, ReactElement, useCallback} from "react";
import {View} from "react-native";

import {useDispatch} from "react-redux";

import Button from "../components/Button";
import Screen from "../components/Screen";
import Span from "../components/Span";
import {__t} from "../i18";
import {WelcomeStackScreenProps} from "../navigation/types";
import {welcomeComplete} from "../store/common/actions";


function AuthScreen({navigation}: WelcomeStackScreenProps<"AuthScreen">): ReactElement {
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

      {navigation.canGoBack() ? (
        <Fragment>
          <Button
            onPress={(): void => navigation.goBack()}>
            {__t("back")}
          </Button>
          <View style={{marginBottom: 10}} />
        </Fragment>
      ) : null}

      <Button onPress={skip}>
        {__t("skip")}
      </Button>

    </Screen>
  );
}

export default AuthScreen;
