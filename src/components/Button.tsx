import {memo, ReactElement, useCallback, useMemo} from "react";
import {Pressable, Text, PressableProps, ViewStyle, StyleProp} from "react-native";

import {useThemeColor} from "../colors";


type _Props = {readonly children: string} & PressableProps;

function Button({onPress, children, ...otherProps}: _Props): ReactElement {
  const backgroundColor = useThemeColor("buttonBackground");
  const textColor = useThemeColor("buttonText");

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
