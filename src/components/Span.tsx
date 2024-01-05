import {memo, ReactElement, useMemo} from "react"
import {Text, TextStyle} from "react-native"

import {ColorNames} from "../colors/types"
import {useThemeColor} from "../colors/useThemeColor"


interface Props {
    colorName?: ColorNames
    weight?: "400" | "600" | "900"
    size?: number
    style?: TextStyle
    children?: string | number | (string | number)[]
    lines?: number
    flex?: boolean
}

function Span(props: Props): ReactElement {
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
            fontSize: size,
            fontWeight: weight,
        }
        if (flex) {
            _style.flex = 1
        }
        // TODO  ↓  maybe try like that
        // transform: [{skewX: "-2deg"}],
        return [_style, style]
    }, [flex, color, size, weight, style])

    return (
        <Text
            ellipsizeMode="tail"
            numberOfLines={lines}
            style={styles}>
            {children}
        </Text>
    )
}

export default memo(Span)
