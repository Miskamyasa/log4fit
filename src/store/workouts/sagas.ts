import {takeLeading} from "@redux-saga/core/effects"
import {uniq} from "lodash"
import {put, select, takeEvery, takeLatest} from "redux-saga/effects"

import {limitWorkouts} from "../../constants/common"
import ErrorHandler from "../../helpers/ErrorHandler"
import idGenerator from "../../helpers/idGenerator"
import {navigation} from "../../navigation/config"
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
        ids: uniq(ids),
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

      const workout = createWorkout()

      store[workout.id] = workout
      ids.push(workout.id)

      if (ids.length > limitWorkouts) {
        const removedId = ids.shift()
        if (removedId) {
          delete store[removedId]
        }
      }

      const payload: LoadWorkoutsAction["payload"] = {
        store,
        ids: uniq(ids),
        current: workout,
      }

      yield put(loadWorkouts(payload))
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
