import {memo, ReactElement, useMemo} from "react";
import {Text, StyleSheet} from "react-native";
import {useThemeColor, ThemeProps} from "../hooks/useThemeColor";


type Props = Text["props"] & ThemeProps;

function Span(props: Props): ReactElement {
  const {style, light, dark, ...otherProps} = props;
  const color = useThemeColor("text", {light, dark});

  const styles = useMemo(() => {
    return StyleSheet.compose({color}, style);
  }, [color, style]);

  return (
    <Text
      style={styles}
      {...otherProps} />
  );
}

export default memo(Span);
