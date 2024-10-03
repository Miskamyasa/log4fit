import {isEmpty} from "lodash"
import {put, select, takeEvery} from "redux-saga/effects"

import {analytics} from "../../helpers/analytics"
import {AppState, SagaGenerator} from "../types"

import {loadApproaches} from "./actions"
import {AddApproachAction, ApproachesReducerState, ClearApproachesForWorkoutAction} from "./types"

export function* watchAddApproach(): SagaGenerator {
    yield takeEvery(
        "AddApproach",
        function* addApproachEffect({payload: approach}: AddApproachAction) {
            try {
                const {store, byWorkout, bySkill}: ApproachesReducerState = yield select(
                    (state: AppState) => state.approaches,
                )

                const {id, skillId, workoutId} = approach

                store[id] = approach

                if (!byWorkout[workoutId]) {
                    byWorkout[workoutId] = []
                }

                byWorkout[workoutId] = [...byWorkout[workoutId], approach.id]

                if (!bySkill[skillId]) {
                    bySkill[skillId] = []
                }

                bySkill[skillId] = [approach.id, ...bySkill[skillId]]

                yield put(loadApproaches({
                    store,
                    byWorkout,
                    bySkill,
                }))
            }
            catch (e) {
                analytics.sendError(e)
            }
        },
    )
}

export function* clearApproachesForWorkout(): SagaGenerator {
    yield takeEvery(
        "ClearApproachesForWorkout",
        function* clearApproachesForWorkoutEffect({payload: workout}: ClearApproachesForWorkoutAction) {
            try {
                const {store: approachesStore, byWorkout, bySkill}: AppState["approaches"] = yield select(
                    (state: AppState) => state.approaches,
                )

                const approachesIds = byWorkout[workout.id]
                if (!isEmpty(approachesIds)) {
                    for (const id of approachesIds) {
                        delete approachesStore[id]
                    }

                    const filterSet = new Set(approachesIds)
                    for (const skillId of workout.skills) {
                        if (bySkill[skillId]) {
                            bySkill[skillId] = bySkill[skillId].filter(id => !filterSet.has(id))
                        }
                    }
                }

                delete byWorkout[workout.id]

                yield put(loadApproaches({
                    store: approachesStore,
                    byWorkout,
                    bySkill,
                }))
            }
            catch (e) {
                analytics.sendError(e)
            }
        },
    )
}
