import {memo, ReactElement, ReactNode, useCallback, useMemo} from "react"
import {Pressable, PressableProps, ViewStyle, StyleProp} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"
import {buttons} from "../constants/defaultStyles"

import Span from "./Span"


type _Props = PressableProps & {
  children: string | ReactNode,
}

function Button({onPress, children, ...otherProps}: _Props): ReactElement {
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
      onPress={onPress}
      style={buttonStyle}
      {...otherProps}>
      {typeof children === "string" ? (
        <Span style={textStyle}>{children}</Span>
      ) : children}
    </Pressable>
  )
}

export default memo(Button)
