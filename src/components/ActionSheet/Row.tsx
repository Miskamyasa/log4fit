import React, {ReactElement, ReactNode} from "react"

import {StyleSheet, View, ViewStyle} from "react-native"

import layout from "../../layout/constants"


type _Props = {
  children: ReactNode,
}

const row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: layout.gap * 1.6,
}

const staticStyles = StyleSheet.create({
  row,
})

function Row({children}: _Props): ReactElement {
  return (
    <View style={staticStyles.row}>
      {children}
    </View>
  )
}

export default Row
