import {
  memo,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react"
import {Animated, type ViewStyle} from "react-native"

import type {ThemeProps} from "../../colors/types"
import {useThemeColor} from "../../colors/useThemeColor"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {useKeyboard} from "../../hooks/useKeyboard"

const staticStyles: {
  container: ViewStyle,
} = createStaticStyles({
  container: {
    borderRadius: layout.gap,
    overflow: "hidden",
    width: layout.width - layout.gap,
    paddingVertical: layout.gap * 2,
    paddingHorizontal: layout.gap * 2,
  },
})

export const colors: ThemeProps = {
  light: "#eaedf1",
  dark: "#1D2125",
}

const gap = layout.iphoneX ? layout.xSafe : layout.gap * 2

export const Container = memo(function Container({
  children,
}: PropsWithChildren) {
  const backgroundColor = useThemeColor("viewBackground", colors)

  const styles = useMemo(() => {
    return [staticStyles.container, {backgroundColor}]
  }, [backgroundColor])

  const [keyboardVisible] = useKeyboard()
  const [translateY] = useState(new Animated.Value(gap / 2))

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: !keyboardVisible ? -gap : gap / 2,
      duration: 133,
      delay: 0,
      useNativeDriver: true,
    }).start()
  }, [keyboardVisible, translateY])

  return (
    <Animated.View style={[styles, {transform: [{translateY}]}]}>
      {children}
    </Animated.View>
  )
})
