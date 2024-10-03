import {all, AllEffect} from "redux-saga/effects"

import {clearApproachesForWorkout, watchAddApproach} from "./approaches/sagas"
import {watchAddCustomSkill, watchFetchSkills} from "./skills/sagas"
import {SagaGenerator} from "./types"
import {watchAddSkillToWorkout, watchAddWorkout, watchStartWorkout} from "./workouts/sagas"

function* rootSaga(): Generator<AllEffect<SagaGenerator>, void> {
    yield all([
        watchAddWorkout(),
        watchStartWorkout(),
        watchFetchSkills(),
        watchAddCustomSkill(),
        watchAddApproach(),
        watchAddSkillToWorkout(),
        clearApproachesForWorkout(),
    ])
}

export default rootSaga
