import {memo, ReactElement} from "react";
import {StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native";

import {MaterialIcons} from "@expo/vector-icons";

import {useThemeColor} from "../../colors";

import {borders, controlHeight, inputHeight} from "./styles";


type _Props = {
  increase: () => void,
  decrease: () => void,
};

const container: ViewStyle = {
  height: inputHeight,
  marginHorizontal: 3,
  justifyContent: "space-between",
};

const button: ViewStyle = {
  width: 35,
  height: controlHeight,
  alignItems: "center",
  justifyContent: "center",
  ...borders,
};

const staticStyles = StyleSheet.create({
  container,
  button,
});

function ChangeValue({increase, decrease}: _Props): ReactElement {
  const color = useThemeColor("text");
  return (
    <View style={staticStyles.container}>
      <TouchableOpacity
        style={staticStyles.button}
        onPress={increase}>
        <MaterialIcons
          color={color}
          name={"add"}
          size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={staticStyles.button}
        onPress={decrease}>
        <MaterialIcons
          color={color}
          name={"remove"}
          size={20} />
      </TouchableOpacity>
    </View>
  );
}

export default memo(ChangeValue);
