import {ReactElement, memo} from "react"
import {StyleSheet, Platform, StatusBar as StatusBarNative, ViewStyle, View} from "react-native"

import layout from "../constants/layout"


const styles: {root: ViewStyle} = StyleSheet.create({
    root: {
        position: "absolute",
        width: layout.width,
        minHeight: layout.statusBarHeight,
        backgroundColor: "#000",
    },
})

const StatusBar = memo(function StatusBar(): ReactElement {
    if (Platform.OS === "ios") {
        return (
            <View style={styles.root}>
                <StatusBarNative barStyle="light-content" />
            </View>
        )
    }
    return (
        <StatusBarNative
            backgroundColor={"#000"}
            barStyle="light-content"
            translucent={true} />
    )
}, () => true)

export default StatusBar
