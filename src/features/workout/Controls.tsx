import {memo, useCallback, useEffect, useState} from "react"
import {
  Animated,
  Easing,
  type TextStyle,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from "react-native"

import {observer} from "mobx-react"

import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import type {Skill} from "../../store/SkillsStore"
import {useStores} from "../../store/useStores"
import {weights, type WeightSteps} from "../../store/WeightsStore"

import {borders, controlHeight} from "./styles"

const staticStyles: {
  button: ViewStyle,
  container: ViewStyle,
  text: TextStyle,
} = createStaticStyles({
  button: {
    width: controlHeight + 10,
    height: controlHeight,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: layout.gap / 2,
    ...borders,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontWeight: "600",
  },
})

const Item = memo(function Item(props: {
  enabled: boolean,
  value: WeightSteps,
  onSelect: (v: WeightSteps) => void,
}) {
  const {enabled, value, onSelect} = props
  const [opacity] = useState(new Animated.Value(0))

  const handlePress = useCallback(() => {onSelect(value)}, [onSelect, value])

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
})

export const Controls = observer(function Controls(props: {
  skillId: Skill["id"],
}) {
  const {weightsStore} = useStores()

  const saved = weightsStore.settings[props.skillId] ?? weights.options[0]

  const handleSelect = useCallback((value: WeightSteps) => {
    weightsStore.setSettings({[props.skillId]: value})
  }, [weightsStore, props.skillId])

  return (
    <View style={staticStyles.container}>
      {weights.options.map((v) => {
        const enabled = saved === v
        return (
          <Item
            key={v}
            enabled={enabled}
            value={v}
            onSelect={handleSelect} />
        )
      })}
    </View>
  )
})
