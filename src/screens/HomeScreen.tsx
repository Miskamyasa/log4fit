import {ReactElement, useCallback} from "react";
import {useDispatch} from "react-redux";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedButton from "../components/ThemedButton";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";
import {reset as resetAction} from "../store/common/actions";

function HomeScreen(props: HomeStackScreenProps<"HomeScreen">): ReactElement {
  const {navigation} = props;
  const dispatch = useDispatch();
  const reset = useCallback(() => {
    dispatch(resetAction());
  }, []);
  return (
    <ThemedView style={{padding: 50}}>
      <ThemedText>{__t("homeScreen.title")}</ThemedText>
      <ThemedButton
        onPress={reset}>
        RESET
      </ThemedButton>
    </ThemedView>
  );
}

export default HomeScreen;
