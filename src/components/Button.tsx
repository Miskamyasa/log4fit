import {memo, type PropsWithChildren, useCallback, useMemo} from "react"
import {
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"
import {buttons} from "../constants/defaultStyles"

import {Span} from "./Span"

export const Button = memo(function Button(
  {onPress, children, style, ...otherProps}: PressableProps & PropsWithChildren,
) {
  const backgroundColor = useThemeColor("buttonBackground")
  const textColor = useThemeColor("buttonText")

  const buttonStyle = useCallback((state: PressableStateCallbackType): StyleProp<ViewStyle> => {
    const resolvedStyle = typeof style === "function" ? style(state) : style

    return [
      {
        ...buttons,
        alignItems: "center",
        backgroundColor,
        opacity: state.pressed ? 0.61 : 1,
      },
      resolvedStyle,
    ]
  }, [backgroundColor, style])

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
