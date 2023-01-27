import {put, select, takeEvery} from "redux-saga/effects"

import ErrorHandler from "../../helpers/ErrorHandler"
import {AppState, SagaGenerator} from "../types"

import {loadApproaches} from "./actions"
import {AddApproachAction, ApproachesReducerState} from "./types"


export function* watchAddApproach(): SagaGenerator {
  yield takeEvery("AddApproach", function* addApproachEffect({payload: approach}: AddApproachAction) {
    try {
      const {store, byWorkout, bySkill}: ApproachesReducerState = yield select((state: AppState) => state.approaches)

      const {id, skillId, workoutId} = approach

      store[id] = approach

      if (!byWorkout[workoutId]) {
        byWorkout[workoutId] = []
      }

      byWorkout[workoutId] = byWorkout[workoutId].concat(approach.id)

      if (!bySkill[skillId]) {
        bySkill[skillId] = []
      }

      bySkill[skillId] = bySkill[skillId].concat(approach.id)

      yield put(loadApproaches({
        store,
        byWorkout,
        bySkill,
      }))

    } catch (e) {
      ErrorHandler(e)
    }
  })
}
