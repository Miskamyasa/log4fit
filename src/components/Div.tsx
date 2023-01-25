import {memo, ReactElement, ReactNode, useMemo} from "react"

import {View, StyleSheet, TouchableOpacity, Constructor, ViewStyle, StyleProp} from "react-native"

import {ColorNames, ThemeProps} from "../colors/types"
import {useThemeColor} from "../colors/useThemeColor"


type _Props = {
  children: ReactNode,
  style?: ViewStyle | StyleProp<ViewStyle>,
  colorName?: ColorNames,
  onPress?: () => void,
  theme?: ThemeProps,
  disabled?: boolean,
}

function Div({style, theme, colorName = "viewBackground", onPress, disabled, children}: _Props): ReactElement {
  const backgroundColor = useThemeColor(colorName, theme)

  const Container: Constructor<TouchableOpacity | View> = onPress ? TouchableOpacity : View

  const styles = useMemo(() => {
    return [{backgroundColor, opacity: disabled ? 0.5 : 1}, style]
  }, [backgroundColor, disabled, style])

  return (
    <Container
      disabled={disabled}
      onPress={onPress}
      style={styles}>
      {children}
    </Container>
  )
}

export default memo(Div)
