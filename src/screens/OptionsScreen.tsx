import {ReactElement, useCallback} from "react";
import {View} from "react-native";

import Button from "../components/Button";
import Header from "../components/Header";
import Screen from "../components/Screen";
import Span from "../components/Span";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";
import {useAppDispatch} from "../store";
import {reset as resetAction} from "../store/common/actions";


function OptionsScreen({navigation}: HomeStackScreenProps<"OptionsScreen">): ReactElement {
  const dispatch = useAppDispatch();

  const reset = useCallback(() => {
    dispatch(resetAction());
  }, [dispatch]);

  return (
    <Screen>
      <Header title={__t("optionsScreen.title")} />
      <View style={{flex: 1}}>

        <View style={{marginTop: 10}}>
          <Span>{__t("optionsScreen.options.weightUnits")}</Span>
        </View>

        <View style={{marginTop: 10}}>
          <Span>{__t("optionsScreen.options.locale")}</Span>
        </View>

        <View style={{marginTop: 10}}>
          <Span>{__t("optionsScreen.options.warmupApproaches")}</Span>
        </View>

      </View>

      <Button
        onPress={(): void => navigation.navigate("AboutScreen")}>
        About
      </Button>
      <View style={{marginBottom: 10}} />

      <Button
        onPress={reset}>
        RESET
      </Button>

    </Screen>
  );
}

export default OptionsScreen;
