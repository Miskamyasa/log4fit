import React, {memo, ReactElement, useMemo} from "react";
import {StyleSheet, View, ActivityIndicator, ViewStyle} from "react-native";

import {useThemeColor} from "../colors";
import layout from "../layout/constants";


const container: ViewStyle = {
  flex: 1,
  alignSelf: "center",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  height: 100,
  marginBottom: 20,
  width: layout.listItemWidth,
};

const overlay: ViewStyle = {
  flex: 1,
  marginBottom: 0,
  position: "absolute",
  zIndex: 10,
  width: layout.width,
  height: layout.height,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
};

const staticStyles = StyleSheet.create({
  container,
  overlay,
});

type Props = {
  containerStyle?: ViewStyle,
  size?: number | "small" | "large",
  overlay?: boolean,
};

function Loader({size = "large", overlay = false}: Props): ReactElement {
  const color = useThemeColor("text");
  const backgroundColor = useThemeColor("loaderBackground");

  const styles = useMemo(() => {
    if (!overlay) {
      return staticStyles.container;
    }
    return StyleSheet.flatten([staticStyles.container, staticStyles.overlay, {backgroundColor}]);
  }, [overlay, backgroundColor]);

  return (
    <View style={styles}>
      <ActivityIndicator
        size={size}
        color={color} />
    </View>
  );
}

export default memo(Loader);
