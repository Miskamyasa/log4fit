import {all, AllEffect} from "redux-saga/effects"

import {clearApproachesForWorkout, watchAddApproach} from "./approaches/sagas"
import {SagaGenerator} from "./types"
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
