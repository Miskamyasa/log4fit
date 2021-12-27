import React, {memo, ReactElement, useMemo} from "react";
import {StyleSheet, View, ActivityIndicator, ViewStyle} from "react-native";

import {useThemeColor} from "../colors";
import layout from "../layout/constants";


const container: ViewStyle = {
  flex: 1,
  alignSelf: "center",
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
  marginBottom: 20,
  width: layout.listItemWidth,
};

const staticStyles = StyleSheet.create({
  container,
});

type Props = {
  size?: number | "small" | "large",
};

function Loader({size = "large"}: Props): ReactElement {
  const backgroundColor = useThemeColor("loaderBackground");
  const loaderColor = useThemeColor("loaderColor");

  const styles = useMemo(() => {
    return StyleSheet.flatten([staticStyles.container, {backgroundColor}]);
  }, [backgroundColor]);

  return (
    <View style={styles}>
      <ActivityIndicator
        size={size}
        color={loaderColor} />
    </View>
  );
}

export default memo(Loader);
