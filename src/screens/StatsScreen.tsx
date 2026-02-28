import {type ReactElement, useMemo} from "react"
import {ScrollView, View} from "react-native"

import {observer} from "mobx-react"

import {Card} from "../components/Card"
import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__locale, __t} from "../helpers/i18n"
import {useStores} from "../store/useStores"

type ExerciseStat = {
  id: string,
  name: string,
  bestWeight: number,
  latestWeight: number,
  sets: number,
}

const staticStyles = createStaticStyles({
  scroll: {
    flex: 1,
    paddingHorizontal: layout.gap,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: layout.gap / 2,
    marginBottom: layout.gap,
  },
  summaryCard: {
    width: (layout.width - layout.gap * 3) / 2,
  },
  sectionTitle: {
    marginVertical: layout.gap,
    paddingHorizontal: layout.gap,
  },
  exerciseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: layout.gap,
  },
  statColumn: {
    alignItems: "center",
    flex: 1,
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

  const {totalWorkouts, totalSets, uniqueExercises, workoutsPerWeek, exerciseStats} = useMemo((): {
    totalWorkouts: number,
    totalSets: number,
    uniqueExercises: number,
    workoutsPerWeek: string,
    exerciseStats: ExerciseStat[],
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

    const nextExerciseStats = Object.entries(approachesStore.idsBySkill)
      .reduce<ExerciseStat[]>((acc, [skillId, ids]): ExerciseStat[] => {
        const approaches = ids
          .map((id): number => approachesStore.registry[id].weight)

        if (!approaches.length) {
          return acc
        }

        const latestWeight = approaches[approaches.length - 1]
        const bestWeight = Math.max(...approaches)
        const skillTitle = Object.hasOwn(skillsStore.registry, skillId)
          ? skillsStore.registry[skillId].title[locale]
          : skillId

        acc.push({
          id: skillId,
          name: skillTitle,
          bestWeight,
          latestWeight,
          sets: ids.length,
        })

        return acc
      }, [])

    return {
      totalWorkouts: nextTotalWorkouts,
      totalSets: nextTotalSets,
      uniqueExercises: nextUniqueExercises,
      workoutsPerWeek: nextWorkoutsPerWeek,
      exerciseStats: nextExerciseStats,
    }
  }, [
    approachesStore.idsBySkill,
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
            <View style={staticStyles.summaryGrid}>
              <View style={staticStyles.summaryCard}>
                <Card>
                  <Span
                    size={24}
                    weight="900">
                    {totalWorkouts}
                  </Span>
                  <Span size={12}>{__t("statsScreen.totalWorkouts")}</Span>
                </Card>
              </View>

              <View style={staticStyles.summaryCard}>
                <Card>
                  <Span
                    size={24}
                    weight="900">
                    {totalSets}
                  </Span>
                  <Span size={12}>{__t("statsScreen.totalSets")}</Span>
                </Card>
              </View>

              <View style={staticStyles.summaryCard}>
                <Card>
                  <Span
                    size={24}
                    weight="900">
                    {uniqueExercises}
                  </Span>
                  <Span size={12}>{__t("statsScreen.uniqueExercises")}</Span>
                </Card>
              </View>

              <View style={staticStyles.summaryCard}>
                <Card>
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
              <Card key={stat.id}>
                <Span weight="600">{stat.name}</Span>
                <View style={staticStyles.exerciseRow}>
                  <View style={staticStyles.statColumn}>
                    <Span weight="600">{stat.bestWeight}</Span>
                    <Span size={12}>{__t("statsScreen.bestWeight")}</Span>
                  </View>

                  <View style={staticStyles.statColumn}>
                    <Span weight="600">{stat.latestWeight}</Span>
                    <Span size={12}>{__t("statsScreen.latestWeight")}</Span>
                  </View>

                  <View style={staticStyles.statColumn}>
                    <Span weight="600">{stat.sets}</Span>
                    <Span size={12}>{__t("statsScreen.totalSetsForSkill")}</Span>
                  </View>
                </View>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </Screen>
  )
})
