import {type ReactElement} from "react"
import {ScrollView} from "react-native"

import {observer} from "mobx-react"

import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {layout} from "../constants/layout"
import {StatsContent} from "../features/stats/StatsContent"
import {useStatsData} from "../features/stats/useStatsData"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"

const staticStyles = createStaticStyles({
  scroll: {
    flex: 1,
    paddingHorizontal: layout.gap,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export const StatsScreen = observer(function StatsScreen(): ReactElement {
  const {
    totalWorkouts,
    totalSets,
    uniqueExercises,
    workoutsPerWeek,
    exerciseStats,
    weeklyMaxApproaches,
    dayLabels,
    isEmpty,
  } = useStatsData()

  return (
    <Screen>
      <Header title={__t("statsScreen.title")} />
      <ScrollView
        contentContainerStyle={isEmpty ? staticStyles.emptyContainer : undefined}
        style={staticStyles.scroll}>
        {isEmpty ? (
          <Span center>{__t("statsScreen.noData")}</Span>
        ) : (
          <StatsContent
            dayLabels={dayLabels}
            exerciseStats={exerciseStats}
            totalSets={totalSets}
            totalWorkouts={totalWorkouts}
            uniqueExercises={uniqueExercises}
            weeklyMaxApproaches={weeklyMaxApproaches}
            workoutsPerWeek={workoutsPerWeek} />
        )}
      </ScrollView>
    </Screen>
  )
})
