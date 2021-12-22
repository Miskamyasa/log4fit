import {ReactElement} from "react";
import {View as RNView, StyleSheet} from "react-native";
import {useThemeColor, ThemeProps} from "../hooks/useThemeColor";

type Props = RNView["props"] & ThemeProps;

export default function View(props: Props): ReactElement {
  const {style, light, dark, ...otherProps} = props;
  const backgroundColor = useThemeColor("background", {light, dark});

  return (
    <RNView
      style={StyleSheet.compose({backgroundColor}, style)}
      {...otherProps} />
  );
}
