import React, {Fragment, ReactElement} from "react"
import {StyleSheet, TextStyle, TouchableOpacity} from "react-native"

import {MaterialIcons} from "@expo/vector-icons"


import {ThemeProps} from "../../colors/types"
import {useThemeColor} from "../../colors/useThemeColor"
import Divider from "../Divider"
import Span from "../Span"

import Row from "./Row"


type _Props = {
  children: string,
  onClosePress?: () => void,
}

const text: TextStyle = {
  fontSize: 16,
}

const staticStyles = StyleSheet.create({
  text,
})

export const colors: Record<"divider", ThemeProps> = {
  divider: {
    light: "#e3e4e7",
    dark: "rgba(58,62,70,0.77)",
  },
}

function Title({children, onClosePress}: _Props): ReactElement {
  const textColor = useThemeColor("text")
  const dividerColor = useThemeColor("text", colors.divider)

  return (
    <Fragment>
      <Row>
        <Span style={staticStyles.text}>{children}</Span>
        {onClosePress && (
          <TouchableOpacity onPress={onClosePress}>
            <MaterialIcons
              color={textColor}
              name={"close"}
              size={20} />
          </TouchableOpacity>
        )}
      </Row>
      <Row>
        <Divider color={dividerColor} />
      </Row>
    </Fragment>
  )
}

export default Title
