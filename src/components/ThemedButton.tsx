import {ReactElement} from "react";
import {Pressable, PressableProps, StyleSheet, ViewStyle, StyleProp} from "react-native";
import {useThemeColor, ThemeProps} from "../hooks/useThemeColor";
import ThemedText from "./ThemedText";

type Props = {style?: ViewStyle, children: string} & PressableProps & ThemeProps;

function ThemedButton(props: Props): ReactElement {
  const {style, light, dark, onPress, children, ...otherProps} = props;
  const backgroundColor = useThemeColor("buttonBackground", {light, dark});

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}): StyleProp<ViewStyle> => StyleSheet.compose({
        alignItems: "center",
        backgroundColor,
        style,
      }, {
        opacity: pressed ? 0.5 : 1,
      })}
      {...otherProps}>
      <ThemedText style={{margin: 10}}>{children}</ThemedText>
    </Pressable>
  );
}

export default ThemedButton;
