import {memo, ReactElement, useMemo} from "react";
import {Text, StyleSheet, TextStyle} from "react-native";

import {useThemeColor, ColorNames, ThemeProps} from "../colors";


type Props = {
  readonly colorName?: ColorNames,
  readonly weight?:  "400" | "600",
  readonly size?: number,
  readonly style?: TextStyle,
  readonly children?: string | number | (string | number)[],
  readonly theme?: ThemeProps,
  readonly lines?: number | undefined,
};

function Span({style, colorName = "text", size = 14, weight = "400", lines = 1, children = ""}: Props): ReactElement {
  const color = useThemeColor(colorName);

  const styles = useMemo(() => {
    const _style: TextStyle = {
      color,
      fontSize: size,
      fontWeight: weight,
      flex: 1,
    };
    return StyleSheet.compose(_style, style);
  }, [color, size, weight, style]);

  return (
    <Text
      style={styles}
      numberOfLines={lines}
      ellipsizeMode="tail">
      {children}
    </Text>
  );
}

export default memo(Span);
