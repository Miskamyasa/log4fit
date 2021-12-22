import {ReactElement} from "react";
import {Text as RNText, StyleSheet} from "react-native";
import {useThemeColor, ThemeProps} from "../hooks/useThemeColor";

type Props = RNText["props"] & ThemeProps;

export default function Text(props: Props): ReactElement {
  const {style, light, dark, ...otherProps} = props;
  const color = useThemeColor("text", {light, dark});

  return (
    <RNText
      style={StyleSheet.compose({color}, style)}
      {...otherProps} />
  );
}
