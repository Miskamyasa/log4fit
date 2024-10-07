import {memo, type ReactElement, useMemo} from "react"
import {ActivityIndicator, StyleSheet, View} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"

const bg = "rgba(20, 20, 20, 0.8)"

const staticStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: bg,
        flex: 1,
        height: "100%",
        justifyContent: "center",
        position: "absolute",
        width: "100%",
        zIndex: 10,
    },
})

export const OverlayLoader = memo(function OverlayLoader(): ReactElement {
    const color = useThemeColor("text")
    const backgroundColor = useThemeColor("overlayBackground")

    const styles = useMemo(() => {
        return [staticStyles.container, {backgroundColor}]
    }, [backgroundColor])

    return (
        <View style={styles}>
            <ActivityIndicator
                color={color}
                size="large"/>
        </View>
    )
})
