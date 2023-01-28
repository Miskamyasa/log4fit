import {ReactElement, ReactNode} from "react"
import {StyleSheet, View, ViewStyle} from "react-native"

import layout from "../constants/layout"


type _Props = {
  children: ReactNode,
}

const container: ViewStyle = {
  width: layout.width,
}

const staticStyles = StyleSheet.create({container})

function PageWrapper({children}: _Props): ReactElement {
  return (
    <View style={staticStyles.container}>
      {children}
    </View>
  )
}

export default PageWrapper
