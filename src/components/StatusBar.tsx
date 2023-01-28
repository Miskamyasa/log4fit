import {ReactElement, memo} from "react"
import {StyleSheet, Platform, StatusBar as StatusBarNative, View, ViewStyle} from "react-native"

import layout from "../constants/layout"


const styles: {root: ViewStyle} = StyleSheet.create({
  root: {
    height: Platform.select({
      android: 25,
      ios: layout.iphoneX ? 50 : 20,
    }),
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
