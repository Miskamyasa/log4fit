import {memo, type ReactElement} from "react"

import {Div} from "../../components/Div"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"

import {ExerciseProgressionList} from "./ExerciseProgressionList"
import {SummaryGrid} from "./SummaryGrid"
import type {ExerciseStat} from "./useStatsData"
import {WeeklyOverview} from "./WeeklyOverview"

type StatsContentProps = {
  weeklyMaxApproaches: number[],
  dayLabels: string[],
  totalWorkouts: number,
  totalSets: number,
  uniqueExercises: number,
  workoutsPerWeek: string,
  exerciseStats: ExerciseStat[],
}

const staticStyles = createStaticStyles({
  weeklyContainer: {
    marginBottom: layout.gap,
    marginTop: layout.gap * 1.5,
  },
})

export const StatsContent = memo(function StatsContent(props: StatsContentProps): ReactElement {
  const {
    weeklyMaxApproaches,
    dayLabels,
    totalWorkouts,
    totalSets,
    uniqueExercises,
    workoutsPerWeek,
    exerciseStats,
  } = props

  return (
    <>
      <Div style={staticStyles.weeklyContainer}>
        <WeeklyOverview
          data={weeklyMaxApproaches}
          dayLabels={dayLabels} />
      </Div>

      <SummaryGrid
        totalSets={totalSets}
        totalWorkouts={totalWorkouts}
        uniqueExercises={uniqueExercises}
        workoutsPerWeek={workoutsPerWeek} />

      <ExerciseProgressionList exerciseStats={exerciseStats} />
    </>
  )
})
