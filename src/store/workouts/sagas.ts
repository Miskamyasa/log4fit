import {PutEffect, takeLeading} from "@redux-saga/core/effects"
import {sortBy, uniq} from "lodash"
import {all, put, select, takeEvery, takeLatest} from "redux-saga/effects"

import {limitWorkouts} from "../../constants/common"
import ErrorHandler from "../../helpers/ErrorHandler"
import idGenerator from "../../helpers/idGenerator"
import {navigation} from "../../navigation/config"
import {clearApproachesForWorkoutAction} from "../approaches/actions"
import {ClearApproachesForWorkoutAction} from "../approaches/types"
import {AppState, SagaGenerator} from "../types"

import {loadWorkouts} from "./actions"
import {AddSkillToWorkoutAction, LoadWorkoutsAction, StartWorkoutAction, Workout} from "./types"


function createWorkout(): Workout {
  return {
    id: idGenerator(),
    date: Date.now(),
    skills: [],
  }
}


export function* watchAddSkillToWorkout(): SagaGenerator {
  yield takeEvery("AddSkillToWorkout", function* addSkillToWorkoutEffect({payload: skillId}: AddSkillToWorkoutAction) {
    try {
      const {store, ids, current}: AppState["workouts"] = yield select((state: AppState) => state.workouts)

      if (!current) {
        yield put(loadWorkouts({store, ids, current}))
        return
      }

      current.skills = uniq([...current.skills, skillId])

      store[current.id] = current

      const payload: LoadWorkoutsAction["payload"] = {
        store,
        ids,
        current,
      }

      yield put(loadWorkouts(payload))

    } catch (e) {
      ErrorHandler(e)
    }
  })
}


export function* watchAddWorkout(): SagaGenerator {
  yield takeLeading("AddWorkout", function* addWorkoutEffect() {
    try {
      const {store, ids}: AppState["workouts"] = yield select((state: AppState) => state.workouts)

      let removedWorkout: Workout | null = null

      if (ids.length >= limitWorkouts) {
        const removedId = ids.pop() as Workout["id"]

        removedWorkout = store[removedId]

        delete store[removedId]
      }

      const workout = createWorkout()

      store[workout.id] = workout

      ids.push(workout.id)

      const sortedIds = sortBy(uniq(ids), id => store[id].date)

      const payload: LoadWorkoutsAction["payload"] = {
        store,
        ids: sortedIds.reverse(),
        current: workout,
      }

      const actions: Array<PutEffect<LoadWorkoutsAction> | PutEffect<ClearApproachesForWorkoutAction>> = [
        put(loadWorkouts(payload)),
      ]

      if (removedWorkout) {
        actions.push(put(clearApproachesForWorkoutAction(removedWorkout)))
      }

      yield all(actions)

      navigation.navigate("CurrentWorkoutScreen", {date: workout.date})

    } catch (e) {
      ErrorHandler(e)
    }
  })
}

export function* watchStartWorkout(): SagaGenerator {
  yield takeLatest("StartWorkout", function* startWorkoutEffect({payload: workoutId}: StartWorkoutAction) {
    try {
      const {store, ids}: AppState["workouts"] = yield select((state: AppState) => state.workouts)

      const current = store[workoutId]

      yield put(loadWorkouts({
        store,
        ids,
        current,
      }))

      navigation.navigate("CurrentWorkoutScreen", {date: current.date})

    } catch (e) {
      ErrorHandler(e)
    }
  })
}
