import {memo, useMemo} from "react"
import {Text, type TextStyle} from "react-native"

import type {ColorNames} from "../colors/types"
import {useThemeColor} from "../colors/useThemeColor"

export const Span = memo(function Span(props: {
    colorName?: ColorNames
    weight?: "400" | "600" | "900"
    size?: number
    style?: TextStyle
    children?: string | number | (string | number)[]
    lines?: number
    flex?: boolean
    center?: boolean
}) {
    const {
        style,
        colorName = "text",
        size = 14,
        weight = "400",
        lines,
        flex,
        children = "",
    } = props

    const color = useThemeColor(colorName)

    const styles = useMemo(() => {
        const _style: TextStyle = {
            color,
            lineHeight: size * 1.4,
            fontSize: size,
            fontWeight: weight,
            textAlign: props.center ? "center" : "left",
        }
        if (flex) {
            _style.flex = 1
        }
        // TODO  ↓  maybe try like that
        // transform: [{skewX: "-2deg"}],
        return [_style, style]
    }, [color, size, weight, props.center, flex, style])

    return (
        <Text
            ellipsizeMode="tail"
            numberOfLines={lines}
            style={styles}>
            {children}
        </Text>
    )
})
