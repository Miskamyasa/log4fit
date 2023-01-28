import {StyleSheet, TextStyle, ViewStyle} from "react-native"

import layout from "../../constants/layout"


export const allButtons: ViewStyle = {
  borderRadius: layout.gap,
  overflow: "hidden",
  height: 64,
  justifyContent: "center",
  paddingHorizontal: layout.gap * 2,
  width: (layout.width - (layout.gap * 1.75)) / 2,
}

const text: TextStyle = {
  fontSize: 15,
  fontWeight: "600",
}

export const buttonsStyles = StyleSheet.create({
  allButtons,
  text,
})

export const borders: ViewStyle = {
  borderRadius: 6,
  overflow: "hidden",
  borderWidth: 2,
  borderColor: "#929496",
}

export const controlHeight = 31
export const inputHeight = 64
export const inputStyles = StyleSheet.create({
  input: {
    height: inputHeight,
    paddingVertical: layout.gap,
    paddingHorizontal: layout.gap / 2,
    fontSize: 28,
    maxWidth: "100%",
    fontWeight: "900",
    textAlign: "right",
    ...borders,
  },
})
