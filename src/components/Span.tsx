import {memo, ReactElement, useMemo} from "react";
import {Text, StyleSheet, TextStyle} from "react-native";

import {useThemeColor, ColorNames} from "../colors";


type Props = {
  readonly colorName?: ColorNames,
  readonly weight?:  "400" | "600",
  readonly size?: number,
  readonly style?: TextStyle,
  readonly children: string | string[],
};

function Span({style, colorName = "text", size = 14, weight = "400", children}: Props): ReactElement {
  const color = useThemeColor(colorName);

  const styles = useMemo(() => {
    return StyleSheet.compose({color, fontSize: size, fontWeight: weight}, style);
  }, [color, size, weight, style]);

  return (
    <Text style={styles}>
      {children}
    </Text>
  );
}

export default memo(Span);
