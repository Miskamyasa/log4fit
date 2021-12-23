import {ReactElement, memo} from "react";
import {StyleSheet, Platform, StatusBar as StatusBarNative, View, ViewStyle} from "react-native";
import Constants from "expo-constants";


const styles: {root: ViewStyle} = StyleSheet.create({
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
