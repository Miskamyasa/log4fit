import {FC, memo, ReactElement, ReactNode, useMemo} from "react";
import {View, StyleSheet, TouchableOpacity, Constructor, ViewStyle} from "react-native";

import {useThemeColor, ColorNames} from "../colors";


type Props = {
  readonly children: ReactNode,
  readonly style: ViewStyle,
  readonly colorName?: ColorNames,
  readonly onPress?: () => void,
};

function Div({style, colorName = "viewBackground", onPress, children}: Props): ReactElement {
  const backgroundColor = useThemeColor(colorName);

  const Container: Constructor<TouchableOpacity | View> = typeof onPress === "function"
    ? TouchableOpacity
    : View;

  const styles = useMemo(() => {
    return StyleSheet.compose({backgroundColor}, style);
  }, [backgroundColor, style]);

  return (
    <Container
      onPress={onPress}
      style={styles}>
      {children}
    </Container>
  );
}

export default memo(Div);
