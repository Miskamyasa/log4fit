import {memo, useMemo} from "react"
import {StyleSheet, View} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"

const staticStyles = StyleSheet.create({
    divider: {
        height: 1,
        width: "100%",
    },
})

export const Divider = memo(function Divider({color}: {
    color?: string
}) {
    const dividerColor = useThemeColor("dividerColor")

    const style = useMemo(() => {
        return [staticStyles.divider, {backgroundColor: color || dividerColor}]
    }, [color, dividerColor])

    return (
        <View style={style} />
    )
})
