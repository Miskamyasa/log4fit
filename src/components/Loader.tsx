import {memo, type ReactElement, useMemo} from "react"
import {ActivityIndicator, StyleSheet, View} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"

const staticStyles = StyleSheet.create({
    container: {
        alignItems: "center",
        alignSelf: "center",
        flex: 1,
        justifyContent: "center",
        padding: 2,
    },
})

export const Loader = memo(function Loader(): ReactElement {
    const backgroundColor = useThemeColor("loaderBackground")
    const loaderColor = useThemeColor("loaderColor")

    const styles = useMemo(() => {
        return [staticStyles.container, {backgroundColor}]
    }, [backgroundColor])

    return (
        <View style={styles}>
            <ActivityIndicator
                color={loaderColor}
                size="large"/>
        </View>
    )
})
