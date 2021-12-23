import {memo, ReactElement, useCallback, useMemo} from "react";
import {Pressable, Text, PressableProps, ViewStyle, StyleProp} from "react-native";
import {useThemeColor, ThemeProps} from "../hooks/useThemeColor";


type Props = {children: string} & PressableProps & ThemeProps;

function Button(props: Props): ReactElement {
  const {light, dark, onPress, children, ...otherProps} = props;
  const backgroundColor = useThemeColor("buttonBackground", {light, dark});
  const textColor = useThemeColor("buttonText", {light, dark});

  const buttonStyle = useCallback(({pressed}): StyleProp<ViewStyle> => ({
    alignItems: "center",
    backgroundColor,
    opacity: pressed ? 0.5 : 1,
  }), [backgroundColor]);

  const textStyle = useMemo(() => ({
    margin: 10,
    color: textColor,
  }), [textColor]);

  return (
    <Pressable
      onPress={onPress}
      style={buttonStyle}
      {...otherProps}>
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
}

export default memo(Button);
