import {ReactElement, useCallback} from "react";
import {View} from "react-native";
import {useDispatch} from "react-redux";
import Button from "../components/Button";
import Screen from "../components/Screen";
import Span from "../components/Span";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";
import {reset as resetAction} from "../store/common/actions";


function HomeScreen(props: HomeStackScreenProps<"HomeScreen">): ReactElement {
  const {navigation} = props;
  const dispatch = useDispatch();
  const reset = useCallback(() => {
    dispatch(resetAction());
  }, [dispatch]);
  return (
    <Screen>
      <View style={{flex: 1}}>
        <Span>{__t("homeScreen.title")}</Span>
      </View>
      <Button
        onPress={reset}>
        RESET
      </Button>
    </Screen>
  );
}

export default HomeScreen;
