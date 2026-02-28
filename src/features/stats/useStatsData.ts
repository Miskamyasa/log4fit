import {useMemo} from "react"

import {__locale, __shortDay} from "../../helpers/i18n"
import {useStores} from "../../store/useStores"

import type {SessionPoint} from "./ExerciseProgressionCard"

const MS_PER_DAY = 86_400_000
const MONDAY = new Date(2024, 0, 1)
const WEEK_DATES = Array.from({length: 7}, (_, i): Date => new Date(MONDAY.getTime() + i * MS_PER_DAY))

export type ExerciseStat = {
  id: string,
  name: string,
  bestWeight: number,
  latestWeight: number,
  sets: number,
  sessions: SessionPoint[],
}

type UseStatsDataResult = {
  totalWorkouts: number,
  totalSets: number,
  uniqueExercises: number,
  workoutsPerWeek: string,
  exerciseStats: ExerciseStat[],
  weeklyMaxApproaches: number[],
  dayLabels: string[],
  isEmpty: boolean,
}

export const useStatsData = (): UseStatsDataResult => {
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

    const nextWeeklyMax = [0, 0, 0, 0, 0, 0, 0]
    for (const id of workoutsStore.ids) {
      const workout = workoutsStore.registry[id]
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

  return {
    totalWorkouts,
    totalSets,
    uniqueExercises,
    workoutsPerWeek,
    exerciseStats,
    weeklyMaxApproaches,
    dayLabels,
    isEmpty,
  }
}
