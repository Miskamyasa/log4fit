import {ReactElement, memo} from "react"

import Constants from "expo-constants"
import {StyleSheet, Platform, StatusBar as StatusBarNative, View, ViewStyle} from "react-native"


const styles: {root: ViewStyle} = StyleSheet.create({
  root: {
    height: Constants.statusBarHeight,
    backgroundColor: "#000",
  },
})

function StatusBarFC(): ReactElement {
  if (Platform.OS === "ios") {
    return (
      <View style={styles.root}>
        <StatusBarNative barStyle="light-content" />
      </View>
    )
  }
  return (
    <StatusBarNative barStyle="light-content" />
  )
}

const StatusBar = memo(StatusBarFC, () => true)

StatusBar.displayName = "StatusBar"

export default StatusBar
