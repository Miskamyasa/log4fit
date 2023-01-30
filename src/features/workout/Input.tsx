import {memo, ReactElement, useCallback, useMemo} from "react"
import {KeyboardTypeOptions, TextInput, TextStyle} from "react-native"

import {primaryColors} from "../../colors/colors"
import {useThemeColor} from "../../colors/useThemeColor"
import analytics from "../../helpers/analytics"
import useBoolean from "../../hooks/useBoolean"

import {inputStyles} from "./styles"


type _Props = {
  name: string,
  ignoreAnalyticsValue: string,
  value: string,
  onChange: (text: string) => void,
  maxLength?: number,
  width?: number,
  keyboardType?: KeyboardTypeOptions,
  style?: TextStyle,
}

function Input(props: _Props): ReactElement {
  const {
    name,
    ignoreAnalyticsValue,
    value,
    onChange,
    maxLength = 3,
    width = (maxLength * 28),
    keyboardType = "numeric",
    style,
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
      maxLength={maxLength}
      autoCorrect={false}
      selectTextOnFocus
      underlineColorAndroid={"transparent"}
      style={inFocus ? styles.inFocus : styles.default}
      value={value}
      onFocus={onFocus}
      onBlur={handleBlur}
      onChangeText={onChange}
      keyboardType={keyboardType} />
  )
}

export default memo(Input)
