import {ReactElement} from "react"
import {StyleSheet, TextStyle, ViewStyle} from "react-native"

import layout from "../constants/layout"

import Div from "./Div"
import SkillImage from "./SkillImage"
import Span from "./Span"


type _Props = {
  title: string,
  icon?: string,
}

const container: ViewStyle = {
  height: 42,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: layout.gap / 2,
  overflow: "hidden",
  flexDirection: "row",
}

const text: TextStyle = {
  fontSize: 15,
}

const staticStyles = StyleSheet.create({container, text})

function PageTitle({title, icon}: _Props): ReactElement {
  return (
    <Div style={staticStyles.container}>
      {icon && (
        <SkillImage name={icon} />
      )}
      <Span style={staticStyles.text}>{title}</Span>
    </Div>
  )
}

export default PageTitle
