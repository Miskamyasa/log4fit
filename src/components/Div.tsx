import {ElementType, memo, ReactNode, useMemo} from "react"
import {View, TouchableOpacity, ViewStyle} from "react-native"

import {ColorNames, ThemeProps} from "../colors/types"
import {useThemeColor} from "../colors/useThemeColor"

export const Div = memo(function Div(props: {
    children: ReactNode
    style?: ViewStyle | ViewStyle[]
    colorName?: ColorNames
    onPress?: () => void
    theme?: ThemeProps
    disabled?: boolean
}) {
    const {style, theme, colorName = "viewBackground", onPress, disabled, children} = props
    const backgroundColor = useThemeColor(colorName, theme)

    const Container = onPress ? TouchableOpacity : View as ElementType

    const styles = useMemo(() => {
        const styles: ViewStyle[] = [{backgroundColor, opacity: disabled ? 0.61 : 1}]
        if (style) {
            Array.isArray(style)
                ? styles.push(...style)
                : styles.push(style)
        }
        return styles
    }, [backgroundColor, disabled, style])

    return (
        <Container
            disabled={disabled}
            style={styles}
            onPress={onPress}>
            {children}
        </Container>
    )
})
