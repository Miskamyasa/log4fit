import {memo, ReactElement, useCallback, useEffect, useState} from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

import Span from "../../components/Span";
import {borders, controlHeight} from "./styles";


export type MultiplicationValues = 1 | 2.5 | 5 | 10;

type _ItemProps = {
  readonly enabled: boolean,
  readonly value: MultiplicationValues,
  readonly onSelect: (v: MultiplicationValues) => void,
};

type _Props = {
  readonly onSelect: (v: MultiplicationValues) => void,
};

const container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
};

const button: ViewStyle = {
  width: 40,
  height: controlHeight,
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 1,
  ...borders,
};

const text: TextStyle = {
  fontWeight: "600",
};

const staticStyles = StyleSheet.create({
  container,
  button,
  text,
});

function Item({enabled, value, onSelect}: _ItemProps): ReactElement {
  const [opacity] = useState(new Animated.Value(0));

  const handlePress = useCallback(() => onSelect(value), [onSelect, value]);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: enabled ? 1 : 0.2,
      duration: 133,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [opacity, enabled]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[staticStyles.button, {opacity}]}>
        <Span style={staticStyles.text}>{value}</Span>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

function Controls({onSelect}: _Props): ReactElement {
  const [value, setValue] = useState<MultiplicationValues>(1);

  const handleSelect = useCallback((value: MultiplicationValues) => {
    setValue(value);
    onSelect(value);
  }, [onSelect]);

  return (
    <View style={staticStyles.container}>
      <Item
        value={1}
        onSelect={handleSelect}
        enabled={value === 1} />
      <Item
        value={2.5}
        onSelect={handleSelect}
        enabled={value === 2.5} />
      <Item
        value={5}
        onSelect={handleSelect}
        enabled={value === 5} />
      <Item
        value={10}
        onSelect={handleSelect}
        enabled={value === 10} />
    </View>
  );
}

export default memo(Controls);
