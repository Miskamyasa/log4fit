import {memo, ReactElement, useMemo} from "react"
import {Text, TextStyle} from "react-native"

import {ColorNames, ThemeProps} from "../colors/types"
import {useThemeColor} from "../colors/useThemeColor"


type _Props = {
  colorName?: ColorNames,
  weight?: "400" | "600" | "900",
  size?: number,
  style?: TextStyle,
  children?: string | number | (string | number)[],
  theme?: ThemeProps,
  lines?: number | undefined,
  flex?: boolean,
}

function Span(props: _Props): ReactElement {
  const {
    style,
    colorName = "text",
    size = 14,
    weight = "400",
    lines,
    flex,
    children = "",
  } = props

  const color = useThemeColor(colorName)

  const styles = useMemo(() => {
    const _style: TextStyle = {
      color,
      fontSize: size,
      fontWeight: weight,
    }
    if (flex) {
      _style.flex = 1
    }
    // TODO  ↓  maybe try like that
    // transform: [{skewX: "-2deg"}],
    return [_style, style]
  }, [flex, color, size, weight, style])

  return (
    <Text
      style={styles}
      numberOfLines={lines}
      ellipsizeMode="tail">
      {children}
    </Text>
  )
}

export default memo(Span)
