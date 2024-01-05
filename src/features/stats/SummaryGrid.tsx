import {memo, type ReactElement} from "react"
import {View} from "react-native"

import {Card} from "../../components/Card"
import {Div} from "../../components/Div"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__t} from "../../helpers/i18n"

import {STATS_CARD_THEME} from "./constants"

type SummaryGridProps = {
  totalWorkouts: number,
  totalSets: number,
  uniqueExercises: number,
  workoutsPerWeek: string,
}

const staticStyles = createStaticStyles({
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: layout.gap / 2,
    marginBottom: layout.gap,
  },
  summaryCard: {
    width: (layout.width - layout.gap * 2.5) / 2,
  },
})

export const SummaryGrid = memo(function SummaryGrid(props: SummaryGridProps): ReactElement {
  const {totalWorkouts, totalSets, uniqueExercises, workoutsPerWeek} = props

  return (
    <Div style={staticStyles.summaryGrid}>
      <View style={staticStyles.summaryCard}>
        <Card theme={STATS_CARD_THEME}>
          <Span
            size={24}
            weight="900">
            {totalWorkouts}
          </Span>
          <Span size={12}>{__t("statsScreen.totalWorkouts")}</Span>
        </Card>
      </View>

      <View style={staticStyles.summaryCard}>
        <Card theme={STATS_CARD_THEME}>
          <Span
            size={24}
            weight="900">
            {totalSets}
          </Span>
          <Span size={12}>{__t("statsScreen.totalSets")}</Span>
        </Card>
      </View>

      <View style={staticStyles.summaryCard}>
        <Card theme={STATS_CARD_THEME}>
          <Span
            size={24}
            weight="900">
            {uniqueExercises}
          </Span>
          <Span size={12}>{__t("statsScreen.uniqueExercises")}</Span>
        </Card>
      </View>

      <View style={staticStyles.summaryCard}>
        <Card theme={STATS_CARD_THEME}>
          <Span
            size={24}
            weight="900">
            {workoutsPerWeek}
          </Span>
          <Span size={12}>{__t("statsScreen.workoutsPerWeek")}</Span>
        </Card>
      </View>
    </Div>
  )
})
