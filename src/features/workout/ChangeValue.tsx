import {memo, ReactElement} from "react"
import {StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native"

import MaterialIcons from "@expo/vector-icons/MaterialIcons"


import {useThemeColor} from "../../colors/useThemeColor"
import layout from "../../constants/layout"

import {borders, controlHeight, inputHeight} from "./styles"


interface Props {
  increase: () => void
  decrease: () => void
}

const container: ViewStyle = {
  height: inputHeight,
  marginLeft: layout.gap / 2,
  justifyContent: "space-between",
}

const button: ViewStyle = {
  width: controlHeight + 10,
  height: controlHeight,
  alignItems: "center",
  justifyContent: "center",
  ...borders,
}

const staticStyles = StyleSheet.create({
  container,
  button,
})

function ChangeValue({increase, decrease}: Props): ReactElement {
  const color = useThemeColor("text")
  return (
    <View style={staticStyles.container}>
      <TouchableOpacity
        style={staticStyles.button}
        onPress={increase}>
        <MaterialIcons
          color={color}
          name={"add"}
          size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={staticStyles.button}
        onPress={decrease}>
        <MaterialIcons
          color={color}
          name={"remove"}
          size={20} />
      </TouchableOpacity>
    </View>
  )
}

export default memo(ChangeValue)
