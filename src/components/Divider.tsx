import {memo, ReactElement, useMemo} from "react"
import {StyleSheet, View, ViewStyle} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"


interface Props {
    color?: string
}

const divider: ViewStyle = {
    height: 1,
    width: "100%",
}

const staticStyles = StyleSheet.create({
    divider,
})

function Divider({color}: Props): ReactElement {
    const dividerColor = useThemeColor("dividerColor")

    const style = useMemo(() => {
        return [staticStyles.divider, {backgroundColor: color || dividerColor}]
    }, [color, dividerColor])

    return (
        <View style={style} />
    )
}

export default memo(Divider)
