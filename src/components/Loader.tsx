import React, {memo, ReactElement, useMemo} from "react";
import {StyleSheet, View, ActivityIndicator, ViewStyle} from "react-native";

import {useThemeColor} from "../colors";


const container: ViewStyle = {
  flex: 1,
  alignSelf: "center",
  justifyContent: "center",
  alignItems: "center",
  padding: 2,
};

const staticStyles = StyleSheet.create({container});

function Loader(): ReactElement {
  const backgroundColor = useThemeColor("loaderBackground");
  const loaderColor = useThemeColor("loaderColor");

  const styles = useMemo(() => {
    return StyleSheet.flatten([staticStyles.container, {backgroundColor}]);
  }, [backgroundColor]);

  return (
    <View style={styles}>
      <ActivityIndicator
        size="large"
        color={loaderColor} />
    </View>
  );
}

export default memo(Loader);
