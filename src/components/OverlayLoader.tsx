import React, {memo, ReactElement, useMemo} from "react";
import {StyleSheet, View, ActivityIndicator, ViewStyle} from "react-native";

import {useThemeColor} from "../colors";


const container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 10,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
};

const staticStyles = StyleSheet.create({
  container,
});

type Props = {
  size?: number | "small" | "large",
};

function OverlayLoader({size = "large"}: Props): ReactElement {
  const color = useThemeColor("text");
  const backgroundColor = useThemeColor("overlayBackground");

  const styles = useMemo(() => {
    return StyleSheet.flatten([staticStyles.container, {backgroundColor}]);
  }, [backgroundColor]);

  return (
    <View style={styles}>
      <ActivityIndicator
        size={size}
        color={color} />
    </View>
  );
}

export default memo(OverlayLoader);
