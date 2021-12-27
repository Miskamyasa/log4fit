import {memo, ReactElement, useMemo} from "react";
import {Text, StyleSheet} from "react-native";

import {useThemeColor, ThemeProps, ColorNames} from "../colors";


type CustomProps = {
  readonly colorName?: ColorNames,
  readonly weight?:  "400" | "600",
  readonly size?: number,
};

type Props =
  & Text["props"]
  & ThemeProps
  & CustomProps
;

function Span({style, colorName = "text", size = 14, weight = "400", ...otherProps}: Props)
  : ReactElement {
  const color = useThemeColor(colorName);

  const styles = useMemo(() => {
    return StyleSheet.compose({color, fontSize: size, fontWeight: weight}, style);
  }, [color, size, weight, style]);

  return (
    <Text
      style={styles}
      {...otherProps} />
  );
}

export default memo(Span);
