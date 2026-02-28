import {type ReactElement, useMemo} from "react"
import {ScrollView, View} from "react-native"

import {observer} from "mobx-react"

import type {ThemeProps} from "../colors/types"
import {Card} from "../components/Card"
import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {layout} from "../constants/layout"
import {ExerciseProgressionCard, type SessionPoint} from "../features/stats/ExerciseProgressionCard"
import {WeeklyOverview} from "../features/stats/WeeklyOverview"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__locale, __shortDay, __t} from "../helpers/i18n"
import {useStores} from "../store/useStores"

const cardTheme: ThemeProps = {
  light: "#fcfcfe",
  dark: "rgba(14, 16, 18, 0.82)",
}

const MS_PER_DAY = 86_400_000
const MONDAY = new Date(2024, 0, 1) // Known Monday
const WEEK_DATES = Array.from({length: 7}, (_, i): Date => new Date(MONDAY.getTime() + i * MS_PER_DAY))

type ExerciseStat = {
  id: string,
  name: string,
  bestWeight: number,
  latestWeight: number,
  sets: number,
  sessions: SessionPoint[],
}

const staticStyles = createStaticStyles({
  scroll: {
    flex: 1,
    paddingHorizontal: layout.gap,
  },
  weeklyContainer: {
    marginBottom: layout.gap,
    marginTop: layout.gap * 1.5,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: layout.gap / 2,
    marginBottom: layout.gap,
  },
  summaryCard: {
    width: (layout.width - layout.gap * 2.5) / 2,
  },
  sectionTitle: {
    marginVertical: layout.gap,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export const StatsScreen = observer(function StatsScreen(): ReactElement {
  const {workoutsStore, approachesStore, skillsStore} = useStores()

  const locale = __locale()

  const dayLabels = WEEK_DATES.map((date): string => __shortDay(date))

  const {totalWorkouts, totalSets, uniqueExercises, workoutsPerWeek, exerciseStats, weeklyMaxApproaches} = useMemo((): {
    totalWorkouts: number,
    totalSets: number,
    uniqueExercises: number,
    workoutsPerWeek: string,
    exerciseStats: ExerciseStat[],
    weeklyMaxApproaches: number[],
  } => {
    const nextTotalWorkouts = workoutsStore.ids.length
    const nextTotalSets = Object.keys(approachesStore.registry).length
    const nextUniqueExercises = Object.keys(approachesStore.idsBySkill).length

    let nextWorkoutsPerWeek = "—"
    if (nextTotalWorkouts >= 2) {
      const firstWorkoutId = workoutsStore.ids[0]
      const lastWorkoutId = workoutsStore.ids[nextTotalWorkouts - 1]
      const firstWorkoutDate = workoutsStore.registry[firstWorkoutId].date
      const lastWorkoutDate = workoutsStore.registry[lastWorkoutId].date
      const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7
      const weeksDiff = Math.abs(firstWorkoutDate - lastWorkoutDate) / millisecondsInWeek
      const safeWeeksDiff = weeksDiff > 0 ? weeksDiff : 1
      nextWorkoutsPerWeek = (nextTotalWorkouts / safeWeeksDiff).toFixed(1)
    }

    // Compute max approaches per weekday (Mon=0 .. Sun=6)
    const nextWeeklyMax = [0, 0, 0, 0, 0, 0, 0]
    for (const id of workoutsStore.ids) {
      const workout = workoutsStore.registry[id]
      // JS Date.getDay(): 0=Sun, 1=Mon ... 6=Sat → remap to Mon=0 .. Sun=6
      const jsDay = new Date(workout.date).getDay()
      const dayIndex = jsDay === 0 ? 6 : jsDay - 1
      const approachCount = (approachesStore.idsByWorkout[id] ?? []).length
      nextWeeklyMax[dayIndex] = Math.max(nextWeeklyMax[dayIndex], approachCount)
    }

    const nextExerciseStats = Object.entries(approachesStore.idsBySkill)
      .reduce<ExerciseStat[]>((acc, [skillId, ids]): ExerciseStat[] => {
        const approaches = ids
          .map((id): number => approachesStore.registry[id].weight)

        if (!approaches.length) {
          return acc
        }

        const latestWeight = approaches[approaches.length - 1]
        const bestWeight = Math.max(...approaches)
        const sessions = workoutsStore.ids
          .reduce<SessionPoint[]>((sessionsAcc, workoutId): SessionPoint[] => {
            const workoutApproachIds = approachesStore.idsByWorkout[workoutId] ?? []
            const workoutApproaches = workoutApproachIds
              .map((id) => approachesStore.registry[id])
              .filter((approach) => approach.skillId === skillId)

            if (!workoutApproaches.length) {
              return sessionsAcc
            }

            const volume = workoutApproaches
              .reduce((sum, approach): number => sum + approach.weight * approach.repeats, 0)
            const maxWeight = Math.max(...workoutApproaches.map((approach): number => approach.weight))
            const repeats = workoutApproaches.map((approach): number => approach.repeats)
            const pattern = repeats.every((repeat): boolean => repeat === repeats[0])
              ? `${repeats.length}×${repeats[0]}`
              : repeats.join("/")

            sessionsAcc.push({
              date: workoutsStore.registry[workoutId].date,
              volume,
              maxWeight,
              pattern,
            })

            return sessionsAcc
          }, [])
          .reverse()
        const skillTitle = Object.hasOwn(skillsStore.registry, skillId)
          ? skillsStore.registry[skillId].title[locale]
          : skillId

        acc.push({
          id: skillId,
          name: skillTitle,
          bestWeight,
          latestWeight,
          sets: ids.length,
          sessions,
        })

        return acc
      }, [])

    return {
      totalWorkouts: nextTotalWorkouts,
      totalSets: nextTotalSets,
      uniqueExercises: nextUniqueExercises,
      workoutsPerWeek: nextWorkoutsPerWeek,
      exerciseStats: nextExerciseStats,
      weeklyMaxApproaches: nextWeeklyMax,
    }
  }, [
    approachesStore.idsBySkill,
    approachesStore.idsByWorkout,
    approachesStore.registry,
    locale,
    skillsStore.registry,
    workoutsStore.ids,
    workoutsStore.registry,
  ])

  const isEmpty = totalWorkouts === 0

  return (
    <Screen>
      <Header title={__t("statsScreen.title")} />
      <ScrollView
        contentContainerStyle={isEmpty ? staticStyles.emptyContainer : undefined}
        style={staticStyles.scroll}>
        {isEmpty ? (
          <Span center>{__t("statsScreen.noData")}</Span>
        ) : (
          <>
            <View style={staticStyles.weeklyContainer}>
              <WeeklyOverview
                data={weeklyMaxApproaches}
                dayLabels={dayLabels} />
            </View>

            <View style={staticStyles.summaryGrid}>
              <View style={staticStyles.summaryCard}>
                <Card theme={cardTheme}>
                  <Span
                    size={24}
                    weight="900">
                    {totalWorkouts}
                  </Span>
                  <Span size={12}>{__t("statsScreen.totalWorkouts")}</Span>
                </Card>
              </View>

              <View style={staticStyles.summaryCard}>
                <Card theme={cardTheme}>
                  <Span
                    size={24}
                    weight="900">
                    {totalSets}
                  </Span>
                  <Span size={12}>{__t("statsScreen.totalSets")}</Span>
                </Card>
              </View>

              <View style={staticStyles.summaryCard}>
                <Card theme={cardTheme}>
                  <Span
                    size={24}
                    weight="900">
                    {uniqueExercises}
                  </Span>
                  <Span size={12}>{__t("statsScreen.uniqueExercises")}</Span>
                </Card>
              </View>

              <View style={staticStyles.summaryCard}>
                <Card theme={cardTheme}>
                  <Span
                    size={24}
                    weight="900">
                    {workoutsPerWeek}
                  </Span>
                  <Span size={12}>{__t("statsScreen.workoutsPerWeek")}</Span>
                </Card>
              </View>
            </View>

            <Span
              size={16}
              style={staticStyles.sectionTitle}
              weight="600">
              {__t("statsScreen.exerciseProgression")}
            </Span>

            {exerciseStats.map((stat): ReactElement => (
              <ExerciseProgressionCard
                key={stat.id}
                bestWeight={stat.bestWeight}
                latestWeight={stat.latestWeight}
                name={stat.name}
                sessions={stat.sessions}
                sets={stat.sets} />
            ))}
          </>
        )}
      </ScrollView>
    </Screen>
  )
})
