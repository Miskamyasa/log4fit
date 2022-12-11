import {memo, ReactElement, useMemo} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import {useThemeColor} from "../colors";


type _Props = {
  color?: string,
};

const divider: ViewStyle = {
  height: 1,
  width: "100%",
};

const staticStyles = StyleSheet.create({
  divider,
});

function Divider({color}: _Props): ReactElement {
  const dividerColor = color || useThemeColor("dividerColor");

  const style = useMemo(() => {
    return StyleSheet.compose(staticStyles.divider, {backgroundColor: dividerColor});
  }, [dividerColor]);

  return (
    <View style={style} />
  );
}

export default memo(Divider);
