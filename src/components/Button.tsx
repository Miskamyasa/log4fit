import {memo, type PropsWithChildren, useCallback, useMemo} from "react"
import {Pressable, type PressableProps, type ViewStyle, type StyleProp} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"
import {buttons} from "../constants/defaultStyles"

import {Span} from "./Span"

export const Button = memo(function Button({onPress, children, ...otherProps}: PressableProps & PropsWithChildren) {
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
      {typeof children === "string"
        ? (
          <Span style={textStyle}>{children}</Span>
        )
        : children}
    </Pressable>
  )
})
