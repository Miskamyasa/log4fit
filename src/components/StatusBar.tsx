import {ReactElement, memo} from "react";
import {StyleSheet} from "react-native";
import {Platform, StatusBar as StatusBarNative, View} from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  root: {
    height: Constants.statusBarHeight,
    backgroundColor: "#000",
  },
});

function StatusBar(): ReactElement {
  if (Platform.OS === "ios") {
    return (
      <View style={styles.root}>
        <StatusBarNative barStyle="light-content" />
      </View>
    );
  }

  return (
    <StatusBarNative barStyle="light-content" />
  );
}

export default memo(StatusBar, () => true);
