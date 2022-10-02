import {memo, ReactElement, useEffect, useState} from "react";
import {
  Animated,
  Easing,
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";

import Span from "../../components/Span";
import useKeyboard from "../../hooks/useKeyboard";
import {__t} from "../../i18";
import layout from "../../layout/constants";
import {borders, controlHeight} from "./styles";


type _Props = {
  readonly enabled: boolean,
  readonly setEnabled: (value: boolean) => void,
};

const button: ViewStyle = {
  flexDirection: "row",
  height: controlHeight,
  justifyContent: "flex-end",
  alignItems: "center",
  paddingRight: layout.gap / 2,
  paddingLeft: layout.gap / 3,
  ...borders,
};

const icon: ImageStyle = {
  width: controlHeight - 7,
  height: controlHeight - 7,
};

const text: TextStyle = {
  fontSize: 11,
  marginLeft: 2,
  fontWeight: "600",
};

const staticStyles = StyleSheet.create({
  button,
  icon,
  text,
});

function Warmup({enabled, setEnabled}: _Props): ReactElement {
  const [opacity] = useState(new Animated.Value(0));

  const [, dismissKeyboard] = useKeyboard();

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: enabled ? 1 : 0.2,
      duration: 133,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [opacity, enabled]);

  return (
    <TouchableWithoutFeedback
      onPress={(): void => {
        dismissKeyboard();
        setEnabled(!enabled);
      }}>
      <Animated.View style={[staticStyles.button, {opacity}]}>
        <Image
          style={staticStyles.icon}
          source={require("../../../assets/images/warmup.png")} />
        <Span style={staticStyles.text}>{__t("workouts.isWarmup")}</Span>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default memo(Warmup);
