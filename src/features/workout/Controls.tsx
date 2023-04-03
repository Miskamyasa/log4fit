import {memo, ReactElement, useCallback, useEffect, useState} from "react"
import {
  Animated,
  Easing,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native"

import Span from "../../components/Span"
import layout from "../../constants/layout"
import {useAppDispatch, useAppSelector} from "../../store"
import {changeStep} from "../../store/settings/actions"
import {MultiplicationValues} from "../../store/settings/types"
import {Skill} from "../../store/skills/types"

import {borders, controlHeight} from "./styles"


type _ItemProps = {
  enabled: boolean,
  value: MultiplicationValues,
  onSelect: (v: MultiplicationValues) => void,
}

interface Props {
  skillId: Skill["id"]
}

const container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const button: ViewStyle = {
  width: controlHeight + 10,
  height: controlHeight,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: layout.gap / 2,
  ...borders,
}

const text: TextStyle = {
  fontWeight: "600",
}

const staticStyles = StyleSheet.create({
  container,
  button,
  text,
})

function Item({enabled, value, onSelect}: _ItemProps): ReactElement {
  const [opacity] = useState(new Animated.Value(0))

  const handlePress = useCallback(() => onSelect(value), [onSelect, value])

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: enabled ? 1 : 0.2,
      duration: 133,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start()
  }, [opacity, enabled])

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[staticStyles.button, {opacity}]}>
        <Span style={staticStyles.text}>{value}</Span>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

function Controls({skillId}: Props): ReactElement {
  const current = useAppSelector(state => state.settings.weightSteps[skillId]) || 1

  const dispatch = useAppDispatch()
  const handleSelect = useCallback((value: MultiplicationValues) => {
    dispatch(changeStep({skillId, value}))
  }, [skillId, dispatch])

  return (
    <View style={staticStyles.container}>
      <Item
        enabled={current === 1}
        value={1}
        onSelect={handleSelect} />
      <Item
        enabled={current === 2}
        value={2}
        onSelect={handleSelect} />
      <Item
        enabled={current === 5}
        value={5}
        onSelect={handleSelect} />
      <Item
        enabled={current === 10}
        value={10}
        onSelect={handleSelect} />
    </View>
  )
}

export default memo(Controls)
