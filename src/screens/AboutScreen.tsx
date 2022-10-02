import {Fragment, ReactElement} from "react";
import {View} from "react-native";

import Constants from "expo-constants";
import {get} from "lodash";

import Button from "../components/Button";
import Header from "../components/Header";
import Screen from "../components/Screen";
import Span from "../components/Span";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";


const appVersion = String(__DEV__
  ? get(Constants, "manifest.version", "Error")
  : get(Constants, "nativeAppVersion", "Error"));

function AboutScreen({navigation}: HomeStackScreenProps<"AboutScreen">): ReactElement {
  return (
    <Screen>
      <Header title={__t("aboutScreen.title")} />

      <View style={{flex: 1}}>
        <Span>{__t("aboutScreen.title")}</Span>

        <View style={{marginTop: 20}}>
          <Span>App Version: {appVersion}</Span>
        </View>
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

    </Screen>
  );
}

export default AboutScreen;
