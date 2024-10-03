import {memo} from "react"
import {Platform, StatusBar as StatusBarNative, View} from "react-native"

import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"

const styles = createStaticStyles({
    root: {
        backgroundColor: "#000",
        minHeight: layout.statusBarHeight,
        position: "absolute",
        width: layout.width,
    },
})

export const StatusBar = memo(function StatusBar() {
    if (Platform.OS === "ios") {
        return (
            <View style={styles.root}>
                <StatusBarNative barStyle="light-content" />
            </View>
        )
    }
    return (
        <StatusBarNative
            backgroundColor="#000"
            barStyle="light-content"
            translucent={true} />
    )
}, () => true)
