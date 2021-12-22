import {ReactElement} from "react";
import {Text, StyleSheet} from "react-native";
import {useThemeColor, ThemeProps} from "../hooks/useThemeColor";

type Props = Text["props"] & ThemeProps;

function ThemedText(props: Props): ReactElement {
  const {style, light, dark, ...otherProps} = props;
  const color = useThemeColor("text", {light, dark});

  return (
    <Text
      style={StyleSheet.compose({color}, style)}
      {...otherProps} />
  );
}

export default ThemedText;
