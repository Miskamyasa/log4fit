import {memo, ReactElement} from "react"
import {StyleSheet, View, ViewStyle} from "react-native"

import layout from "../constants/layout"
import {Approach} from "../store/approaches/types"

import Div from "./Div"
import Span from "./Span"


type _Props = Approach & {
  counter: number,
  flex?: boolean,
}

const container: ViewStyle = {
  height: 42,
  width: layout.width - (layout.gap * 3) - 32 - 100,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(155,155,155, 0.02)",
  marginBottom: layout.gap / 2,
  borderRadius: 4,
  overflow: "hidden",
}

const fullWidth: ViewStyle = {
  ...container,
  width: "100%",
}

const itemStyle: ViewStyle = {
  alignItems: "center",
  paddingRight: layout.gap / 2,
}

const widths: Record<"5" | "15" | "20" | "30", ViewStyle> = {
  "5": {
    ...itemStyle,
    width: "5%",
  },
  "15": {
    ...itemStyle,
    width: "15%",
  },
  "20": {
    ...itemStyle,
    width: "20%",
  },
  "30": {
    ...itemStyle,
    width: "30%",
  },
}

const staticStyles = StyleSheet.create({container, fullWidth, ...widths})

function ApproachCard({counter, repeats, weight, flex = false}: _Props): ReactElement {
  return (
    <Div style={flex ? staticStyles.fullWidth : staticStyles.container}>

      <View style={staticStyles["30"]}>
        {counter > 1 ? (
          <Span
            size={20}
            weight={"900"}>
            {counter}
          </Span>
        ) : null}
      </View>

      <View style={staticStyles["15"]}>
        {counter > 1 ? (
          <Span
            size={17}
            weight={"900"}>
          &times;
          </Span>
        ) : null}
      </View>

      <View style={staticStyles["15"]}>
        <Span
          size={20}
          weight={"900"}>
          {repeats}
        </Span>
      </View>

      <View style={staticStyles["15"]}>
        <Span
          size={17}
          weight={"900"}>
          &times;
        </Span>
      </View>

      <View style={staticStyles["20"]}>
        <Span
          size={20}
          weight={"900"}>
          {weight}
        </Span>
      </View>

      <View style={staticStyles["5"]}>
        <Span>&nbsp;</Span>
        {/*// Здесь надо сделать наслоение соседних повторов*/}
      </View>

    </Div>
  )
}

export default memo(ApproachCard)
