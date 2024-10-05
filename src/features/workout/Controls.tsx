import {memo, useCallback, useEffect, useState} from "react"
import {
    Animated,
    Easing,
    StyleSheet,
    TextStyle,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from "react-native"

import {observer} from "mobx-react"

import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import type {WeightStep} from "../../store/approaches/types"
import {Skill} from "../../store/skills/types"
import {useStores} from "../../store/useStores"

import {borders, controlHeight} from "./styles"

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
    button,
    container,
    text,
})

const Item = memo(function Item(props: {
    enabled: boolean
    value: WeightStep
    onSelect: (v: WeightStep) => void
}) {
    const {enabled, value, onSelect} = props
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
})

export const Controls = observer(function Controls({skillId}: {
    skillId: Skill["id"]
}) {
    const {weightsStore} = useStores()

    const current = weightsStore.settings[skillId] || 1

    const handleSelect = useCallback((value: WeightStep) => {
        weightsStore.saveSettings({[skillId]: value})
    }, [weightsStore, skillId])

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
})
