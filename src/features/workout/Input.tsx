import {memo, useCallback, useMemo, type RefObject} from "react"
import {type KeyboardTypeOptions, TextInput, type TextStyle} from "react-native"

import {primaryColors} from "../../colors/colors"
import {useThemeColor} from "../../colors/useThemeColor"
import {analytics} from "../../helpers/analytics"
import {useBoolean} from "../../hooks/useBoolean"

import {inputStyles} from "./styles"

export const Input = memo(function Input(props: {
    name: string
    ignoreAnalyticsValue: string
    value: string
    onChange: (text: string) => void
    maxLength?: number
    width?: number
    keyboardType?: KeyboardTypeOptions
    style?: TextStyle
    inputRef?: RefObject<TextInput>
    onLayout?: () => void
}) {
    const {
        name,
        ignoreAnalyticsValue,
        value,
        onChange,
        maxLength = 3,
        width = (maxLength * 28),
        keyboardType = "numeric",
        style,
        inputRef,
        onLayout,
    } = props

    const [inFocus, onFocus, onBlur] = useBoolean()

    const handleBlur = useCallback(() => {
        if (value !== ignoreAnalyticsValue) {
            analytics.sendEvent("blur_input", {name, value})
        }
        onBlur()
    }, [name, onBlur, value, ignoreAnalyticsValue])

    const textColor = useThemeColor("text")
    const focusColor = useThemeColor("text", primaryColors.color)

    const styles = useMemo(() => {
        const defaultStyles = [inputStyles.input, {color: textColor, width}, style]
        return {
            default: defaultStyles,
            inFocus: [...defaultStyles, {borderColor: focusColor}],
        }
    }, [textColor, focusColor, width, style])

    return (
        <TextInput
            ref={inputRef}
            selectTextOnFocus
            autoCorrect={false}
            keyboardType={keyboardType}
            maxLength={maxLength}
            style={inFocus ? styles.inFocus : styles.default}
            underlineColorAndroid="transparent"
            value={value}
            onBlur={handleBlur}
            onChangeText={onChange}
            onFocus={onFocus}
            onLayout={onLayout} />
    )
})
