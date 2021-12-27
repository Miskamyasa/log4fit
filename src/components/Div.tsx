import {memo, ReactElement, useMemo} from "react";
import {View, StyleSheet, TouchableOpacity, Constructor} from "react-native";

import {useThemeColor, ThemeProps, ColorNames} from "../colors";


type CustomProps = {
  readonly colorName?: ColorNames,
  onPress?: () => void,
};

type Props =
  & TouchableOpacity["props"]
  & ThemeProps
  & CustomProps
;

function Div({style, colorName = "viewBackground", onPress, ...otherProps}: Props): ReactElement {
  const backgroundColor = useThemeColor(colorName);

  const Container: Constructor<TouchableOpacity | View> = typeof onPress === "function"
    ? TouchableOpacity
    : View;

  const styles = useMemo(() => {
    return StyleSheet.compose({backgroundColor}, style);
  }, [backgroundColor, style]);
  
  return (
    <Container
      style={styles}
      {...otherProps} />
  );
}

export default memo(Div);
