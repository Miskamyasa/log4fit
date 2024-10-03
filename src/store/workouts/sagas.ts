import {PutEffect, takeLeading} from "@redux-saga/core/effects"
import {sortBy, uniq} from "lodash"
import {all, put, select, takeEvery, takeLatest} from "redux-saga/effects"

import {analytics} from "../../helpers/analytics"
import {idGenerator} from "../../helpers/idGenerator"
import {navigation} from "../../navigation/config"
import {ClearApproachesForWorkoutAction} from "../approaches/types"
import {SagaGenerator} from "../types"

import {failAddWorkout, loadWorkouts} from "./actions"
import {selectWorkouts} from "./selectors"
import {AddSkillToWorkoutAction, LoadWorkoutsAction, StartWorkoutAction, Workout, WorkoutsReducerState} from "./types"

function createWorkout(): Workout {
    return {
        id: idGenerator(),
        date: Date.now(),
        skills: [],
    }
}

export function* watchAddSkillToWorkout(): SagaGenerator {
    yield takeEvery<AddSkillToWorkoutAction>(
        "AddSkillToWorkout",
        function* addSkillToWorkoutEffect({payload: skillId}: AddSkillToWorkoutAction) {
            try {
                const {store, ids, current}: WorkoutsReducerState = yield select(selectWorkouts)

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
            }
            catch (e) {
                analytics.sendError(e)
                yield put(failAddWorkout())
            }
        },
    )
}

export function* watchAddWorkout(): SagaGenerator {
    yield takeLeading("AddWorkout", function* addWorkoutEffect() {
        try {
            const {store, ids}: WorkoutsReducerState = yield select(selectWorkouts)

            const workout = createWorkout()

            store[workout.id] = workout

            ids.push(workout.id)

            const sortedIds = sortBy(uniq(ids), id => store[id].date).reverse()

            const payload: LoadWorkoutsAction["payload"] = {
                store,
                ids: sortedIds,
                current: workout,
            }

            const actions: Array<PutEffect<LoadWorkoutsAction> | PutEffect<ClearApproachesForWorkoutAction>> = [
                put(loadWorkouts(payload)),
            ]

            yield all(actions)

            navigation.navigate("CurrentWorkoutScreen", {date: workout.date})
        }
        catch (e) {
            analytics.sendError(e)
        }
    })
}

export function* watchStartWorkout(): SagaGenerator {
    yield takeLatest<StartWorkoutAction>(
        "StartWorkout",
        function* startWorkoutEffect({payload: workoutId}: StartWorkoutAction) {
            try {
                const {store, ids}: WorkoutsReducerState = yield select(selectWorkouts)

                const current = store[workoutId]

                yield put(loadWorkouts({
                    store,
                    ids,
                    current,
                }))

                navigation.navigate("CurrentWorkoutScreen", {date: current.date})
            }
            catch (e) {
                analytics.sendError(e)
            }
        },
    )
}
