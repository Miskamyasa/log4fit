import {ReactElement} from "react";
import {View, StyleSheet} from "react-native";
import {useThemeColor, ThemeProps} from "../hooks/useThemeColor";

type Props = View["props"] & ThemeProps;

function ThemedView(props: Props): ReactElement {
  const {style, light, dark, ...otherProps} = props;
  const backgroundColor = useThemeColor("background", {light, dark});

  return (
    <View
      style={StyleSheet.compose({backgroundColor}, style)}
      {...otherProps} />
  );
}

export default ThemedView;
