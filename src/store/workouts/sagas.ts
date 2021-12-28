import {put, takeLatest} from "redux-saga/effects";

import {SagaGenerator} from "../types";
import {loadWorkouts} from "./actions";


export function* watchFetchWorkouts(): SagaGenerator {
  yield takeLatest("FetchWorkouts", function* fetchWorkoutsEffect() {
    try {
      yield put(loadWorkouts([]));
    } catch (e) {
    // eslint-disable-next-line no-console
      console.error(e);
    }
  });
}
