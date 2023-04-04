import {memo, ReactElement, useMemo} from "react"
import {StyleSheet, View, ActivityIndicator, ViewStyle} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"


const container: ViewStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(20, 20, 20, 0.8)",
}

const staticStyles = StyleSheet.create({container})

function OverlayLoader(): ReactElement {
    const color = useThemeColor("text")
    const backgroundColor = useThemeColor("overlayBackground")

    const styles = useMemo(() => {
        return [staticStyles.container, {backgroundColor}]
    }, [backgroundColor])

    return (
        <View style={styles}>
            <ActivityIndicator
                color={color}
                size={"large"} />
        </View>
    )
}

export default memo(OverlayLoader)
