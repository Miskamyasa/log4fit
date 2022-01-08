import {memo, ReactElement, useMemo} from "react";
import {Text, StyleSheet, TextStyle} from "react-native";

import {useThemeColor, ColorNames, ThemeProps} from "../colors";


type _Props = {
  readonly colorName?: ColorNames,
  readonly weight?:  "400" | "600",
  readonly size?: number,
  readonly style?: TextStyle,
  readonly children?: string | number | (string | number)[],
  readonly theme?: ThemeProps,
  readonly lines?: number | undefined,
  readonly flex?: boolean,
};

function Span(props: _Props): ReactElement {
  const {style, colorName = "text", size = 14, weight = "400", lines, flex, children = ""} = props;

  const color = useThemeColor(colorName);

  const styles = useMemo(() => {
    const _style: TextStyle = {
      color,
      fontSize: size,
      fontWeight: weight,
    };
    if (flex) {
      _style.flex = 1;
    }
    // TODO  ↓  maybe try like that
    // transform: [{skewX: "-2deg"}],
    return StyleSheet.compose(_style, style);
  }, [flex, color, size, weight, style]);

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
