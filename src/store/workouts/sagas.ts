import {takeLeading} from "@redux-saga/core/effects"
import {isEmpty, uniq} from "lodash"
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

      if (ids.length >= limitWorkouts) {
        const removedId = ids.pop() as Workout["id"]
        const workout = store[removedId]

        const {store: approachesStore, byWorkout, bySkill}: AppState["approaches"] = yield select(
          (state: AppState) => state.approaches
        )

        const approachesIds = byWorkout[removedId]
        if (!isEmpty(approachesIds)) {
          for (const id of approachesIds) {
            // removes deleted approach from store
            delete approachesStore[id]
          }

          // removes approaches ids from skill
          const filterSet = new Set(approachesIds)
          for (const skillId of workout.skills) {
            if (bySkill[skillId]) {
              bySkill[skillId] = bySkill[skillId].filter(id => !filterSet.has(id))
            }
          }
        }

        // removes workout link from approaches store
        delete byWorkout[removedId]

        // removes workout from store
        delete store[removedId]
      }

      const workout = createWorkout()

      store[workout.id] = workout

      const payload: LoadWorkoutsAction["payload"] = {
        store,
        ids: [workout.id, ...ids],
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
