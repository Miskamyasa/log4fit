import {all} from "redux-saga/effects";

import {watchLoadWorkout, watchStartWorkout} from "./currentWorkout/sagas";
import {watchFetchWorkouts} from "./workouts/sagas";


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function* rootSaga() {
  yield all([
    watchFetchWorkouts(),
    watchStartWorkout(),
    watchLoadWorkout(),
  ]);
}

export default rootSaga;
