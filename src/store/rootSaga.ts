import {all} from "redux-saga/effects";

import {watchFetchApproaches} from "./approaches/sagas";
import {watchLoadWorkout, watchStartWorkout} from "./currentWorkout/sagas";
import {watchAddCustomExercise, watchFetchExercises} from "./exercises/sagas";
import {watchFetchWorkouts} from "./workouts/sagas";


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* rootSaga() {
  yield all([
    watchFetchWorkouts(),
    watchStartWorkout(),
    watchLoadWorkout(),
    watchFetchExercises(),
    watchFetchApproaches(),
    watchAddCustomExercise(),
  ]);
}

export default rootSaga;
