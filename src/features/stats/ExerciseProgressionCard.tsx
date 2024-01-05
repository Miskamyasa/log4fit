import {memo, type ReactElement} from "react"
import {View} from "react-native"

import {Card} from "../../components/Card"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__t} from "../../helpers/i18n"

import {STATS_CARD_THEME} from "./constants"
import {LineChart} from "./LineChart"
import {PatternTimeline} from "./PatternTimeline"

export type SessionPoint = {
  date: number,
  volume: number,
  maxWeight: number,
  pattern: string,
}

type ExerciseProgressionCardProps = {
  name: string,
  bestWeight: number,
  latestWeight: number,
  sets: number,
  sessions: SessionPoint[],
}

const staticStyles = createStaticStyles({
  exerciseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: layout.gap,
  },
  statColumn: {
    alignItems: "center",
    flex: 1,
  },
  chartsSection: {
    marginTop: layout.gap,
  },
  chartSpacing: {
    marginTop: layout.gap / 2,
  },
})

export const ExerciseProgressionCard = memo(function ExerciseProgressionCard(
  props: ExerciseProgressionCardProps,
): ReactElement {
  const {name, bestWeight, latestWeight, sets, sessions} = props
  const hasSessions = sessions.length > 0

  return (
    <Card theme={STATS_CARD_THEME}>
      <Span weight="600">{name}</Span>

      <View style={staticStyles.exerciseRow}>
        <View style={staticStyles.statColumn}>
          <Span weight="600">{bestWeight}</Span>
          <Span size={12}>{__t("statsScreen.bestWeight")}</Span>
        </View>

        <View style={staticStyles.statColumn}>
          <Span weight="600">{latestWeight}</Span>
          <Span size={12}>{__t("statsScreen.latestWeight")}</Span>
        </View>

        <View style={staticStyles.statColumn}>
          <Span weight="600">{sets}</Span>
          <Span size={12}>{__t("statsScreen.totalSetsForSkill")}</Span>
        </View>
      </View>

      {hasSessions ? (
        <View style={staticStyles.chartsSection}>
          <LineChart
            data={sessions.map((session): number => session.volume)}
            label={__t("statsScreen.volume")} />

          <View style={staticStyles.chartSpacing}>
            <LineChart
              data={sessions.map((session): number => session.maxWeight)}
              label={__t("statsScreen.weight")} />
          </View>

          <View style={staticStyles.chartSpacing}>
            <PatternTimeline
              label={__t("statsScreen.pattern")}
              patterns={sessions.map((session): string => session.pattern)} />
          </View>
        </View>
      ) : null}
    </Card>
  )
})
