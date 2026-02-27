import {memo, useState, type ReactElement} from "react"
import {Switch} from "react-native"

import {memoize} from "lodash"

import {primaryColors} from "../colors/colors"
import {useThemeColor} from "../colors/useThemeColor"

const inactiveColor = "rgba(155,166,171,0.38)"
const trackColor = memoize((activeColor: string) => ({false: inactiveColor, true: activeColor}))
const thumbColor = memoize((state, activeColor: string) => state ? activeColor : "rgb(122,122,122)")

export const Toggle = memo(function Toggle({onToggle, defaultValue = false}: {
  onToggle?: (state: boolean) => void,
  defaultValue?: boolean,
}): ReactElement {
  const [state, setState] = useState(defaultValue)
  const trackThemeColor = useThemeColor("buttonBackground", primaryColors.background)
  const thumbThemeColor = useThemeColor("buttonText", primaryColors.color)

  const handleToggle = (): void => {
    setState(!state)
    if (onToggle) {
      onToggle(!state)
    }
  }

  return (
    <Switch
      ios_backgroundColor={inactiveColor}
      thumbColor={thumbColor(state, thumbThemeColor)}
      trackColor={trackColor(trackThemeColor)}
      value={state}
      onValueChange={handleToggle} />
  )
})
