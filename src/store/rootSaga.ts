import {all, type AllEffect} from "redux-saga/effects"

import {clearApproachesForWorkout, watchAddApproach} from "./approaches/sagas"
import type {SagaGenerator} from "./types"
import {watchAddSkillToWorkout, watchAddWorkout, watchStartWorkout} from "./workouts/sagas"

function* rootSaga(): Generator<AllEffect<SagaGenerator>, void> {
    yield all([
        watchAddWorkout(),
        watchStartWorkout(),
        watchAddApproach(),
        watchAddSkillToWorkout(),
        clearApproachesForWorkout(),
    ])
}

export default rootSaga
