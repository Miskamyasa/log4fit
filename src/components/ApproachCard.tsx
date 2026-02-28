import {memo} from "react"
import {View, type ViewStyle} from "react-native"

import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__date} from "../helpers/i18n"
import type {Approach} from "../store/schemas"
import {useStores} from "../store/useStores"

import {Div} from "./Div"
import {Span} from "./Span"

const width
  // screen width
  = layout.width
  // minus icon and title paddings
    - (layout.gap * 3.5)
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
  5: {
    ...itemStyle,
    width: "5%",
  },
  10: {
    ...itemStyle,
    width: "10%",
  },
  20: {
    ...itemStyle,
    width: "20%",
  },
  25: {
    ...itemStyle,
    width: "25%",
  },
  30: {
    ...itemStyle,
    width: "30%",
  },
}

const styles = createStaticStyles({container, fullWidth, ...widths})

export const ApproachCard = memo(function ApproachCard(props: {
  id: Approach["id"],
  date?: boolean,
  flex?: boolean,
}) {
  const {id, date = false, flex = false} = props
  const {workoutsStore, approachesStore} = useStores()

  const data = approachesStore.registry[id]
  const workout = workoutsStore.registry[data.workoutId]

  return (
    <Div style={flex ? styles.fullWidth : styles.container}>
      <View style={styles["30"]}>
        <Span>{date ? __date(workout.date) : ""}</Span>
      </View>
      <View style={styles["10"]}>
        <Span>&nbsp;</Span>
      </View>
      <View style={styles["20"]}>
        <Span
          size={20}
          weight="900">
          {data.repeats}
        </Span>
      </View>
      <View style={styles["10"]}>
        <Span
          size={17}
          weight="900">
          &times;
        </Span>
      </View>
      <View style={styles["25"]}>
        <Span
          size={20}
          weight="900">
          {data.weight}
        </Span>
      </View>
      <View style={styles["5"]}>
        <Span>&nbsp;</Span>
      </View>
    </Div>
  )
})
