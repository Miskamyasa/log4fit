import {ReactElement, ReactNode} from "react"
import {StyleSheet, View, ViewStyle} from "react-native"

import layout from "../constants/layout"


interface Props {
  children: ReactNode
}

const container: ViewStyle = {
  width: layout.width,
}

const staticStyles = StyleSheet.create({container})

function PageWrapper({children}: Props): ReactElement {
  return (
    <View style={staticStyles.container}>
      {children}
    </View>
  )
}

export default PageWrapper
