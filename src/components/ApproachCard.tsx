import {memo, ReactElement} from "react"
import {StyleSheet, View, ViewStyle} from "react-native"

import layout from "../constants/layout"
import {__date} from "../i18"
import {useAppSelector} from "../store"
import {Approach} from "../store/approaches/types"

import Div from "./Div"
import Span from "./Span"


interface Props {
  id: Approach["id"]
  date?: boolean
  flex?: boolean
}

const width
  // screen width
  = layout.width
  // minus icon and title paddings
  - (layout.gap * 4.5)
  // minus icon width
  - layout.iconWidth
  // minus skill title width
  - layout.skillTitleWidth

const container: ViewStyle = {
  height: 42,
  width,
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "rgba(155,155,155, 0.1)",
  marginBottom: layout.gap / 2,
  borderRadius: 6,
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

const widths: Record<"5" | "10" | "20" | "25" | "30", ViewStyle> = {
  "5": {
    ...itemStyle,
    width: "5%",
  },
  "10": {
    ...itemStyle,
    width: "10%",
  },
  "20": {
    ...itemStyle,
    width: "20%",
  },
  "25": {
    ...itemStyle,
    width: "25%",
  },
  "30": {
    ...itemStyle,
    width: "30%",
  },
}

const staticStyles = StyleSheet.create({container, fullWidth, ...widths})

function ApproachCard({id, date = false, flex = false}: Props): ReactElement {
  const data = useAppSelector(state => state.approaches.store[id])
  const workout = useAppSelector(state => state.workouts.store[data.workoutId])

  return (
    <Div style={flex ? staticStyles.fullWidth : staticStyles.container}>

      <View style={staticStyles["30"]}>
        <Span>{date ? __date(workout.date) : ""}</Span>
      </View>

      <View style={staticStyles["10"]}>
        <Span>&nbsp;</Span>
      </View>

      <View style={staticStyles["20"]}>
        <Span
          size={20}
          weight={"900"}>
          {data.repeats}
        </Span>
      </View>

      <View style={staticStyles["10"]}>
        <Span
          size={17}
          weight={"900"}>
          &times;
        </Span>
      </View>

      <View style={staticStyles["25"]}>
        <Span
          size={20}
          weight={"900"}>
          {data.weight}
        </Span>
      </View>

      <View style={staticStyles["5"]}>
        <Span>&nbsp;</Span>
      </View>

    </Div>
  )
}

export default memo(ApproachCard)
