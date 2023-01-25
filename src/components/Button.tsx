import {memo, ReactElement, ReactNode, useCallback, useMemo} from "react"

import {Pressable, Text, PressableProps, ViewStyle, StyleProp} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"


type _Props = PressableProps & {
  children: string | ReactNode,
}

function Button({onPress, children, ...otherProps}: _Props): ReactElement {
  const backgroundColor = useThemeColor("buttonBackground")
  const textColor = useThemeColor("buttonText")

  const buttonStyle = useCallback(({pressed}: {pressed: boolean}): StyleProp<ViewStyle> => ({
    alignItems: "center",
    backgroundColor,
    opacity: pressed ? 0.5 : 1,
  }), [backgroundColor])

  const textStyle = useMemo(() => ({color: textColor}), [textColor])

  return (
    <Pressable
      onPress={onPress}
      style={buttonStyle}
      {...otherProps}>
      {typeof children === "string" ? (
        <Text style={textStyle}>{children}</Text>
      ) : children}
    </Pressable>
  )
}

export default memo(Button)
