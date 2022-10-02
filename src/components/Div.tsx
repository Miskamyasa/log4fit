import {memo, ReactElement, ReactNode, useMemo} from "react";
import {View, StyleSheet, TouchableOpacity, Constructor, ViewStyle, StyleProp} from "react-native";

import {useThemeColor, ColorNames, ThemeProps} from "../colors";


type _Props = {
  readonly children: ReactNode,
  readonly style?: ViewStyle | StyleProp<ViewStyle>,
  readonly colorName?: ColorNames,
  readonly onPress?: () => void,
  readonly theme?: ThemeProps,
  readonly disabled?: boolean,
};

function Div({style, theme, colorName = "viewBackground", onPress, disabled, children}: _Props): ReactElement {
  const backgroundColor = useThemeColor(colorName, theme);

  const Container: Constructor<TouchableOpacity | View> = onPress ? TouchableOpacity : View;

  const styles = useMemo(() => {
    return StyleSheet.compose({backgroundColor, opacity: disabled ? 0.5 : 1}, style);
  }, [backgroundColor, disabled, style]);

  return (
    <Container
      disabled={disabled}
      onPress={onPress}
      style={styles}>
      {children}
    </Container>
  );
}

export default memo(Div);
