import {memo, ReactElement, ReactNode, useCallback, useMemo} from "react"
import {Pressable, PressableProps, ViewStyle, StyleProp} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"
import {buttons} from "../constants/defaultStyles"

import Span from "./Span"


interface Props extends PressableProps {
    children: string | ReactNode
}

function Button({onPress, children, ...otherProps}: Props): ReactElement {
    const backgroundColor = useThemeColor("buttonBackground")
    const textColor = useThemeColor("buttonText")

    const buttonStyle = useCallback(({pressed}: {pressed: boolean}): StyleProp<ViewStyle> => ({
        ...buttons,
        alignItems: "center",
        backgroundColor,
        opacity: pressed ? 0.61 : 1,
    }), [backgroundColor])

    const textStyle = useMemo(() => ({color: textColor}), [textColor])

    return (
        <Pressable
            style={buttonStyle}
            onPress={onPress}
            {...otherProps}>
            {typeof children === "string" ? (
                <Span style={textStyle}>{children}</Span>
            ) : children}
        </Pressable>
    )
}

export default memo(Button)
