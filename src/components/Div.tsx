import {memo, ReactElement, useMemo} from "react";
import {View, StyleSheet} from "react-native";
import {useThemeColor, ThemeProps} from "../hooks/useThemeColor";


type Props = View["props"] & ThemeProps;

function Div(props: Props): ReactElement {
  const {style, light, dark, ...otherProps} = props;
  const backgroundColor = useThemeColor("viewBackground", {light, dark});

  const styles = useMemo(() => {
    return StyleSheet.compose({backgroundColor}, style);
  }, [backgroundColor, style]);

  return (
    <View
      style={styles}
      {...otherProps} />
  );
}

export default memo(Div);
