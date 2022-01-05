import {put, select, takeLatest} from "redux-saga/effects";

import {navigation} from "../../navigation/config";
import {AppState, SagaGenerator} from "../types";
import {Workout} from "../workouts/types";
import {loadWorkout} from "./actions";
import {StartCurrentWorkoutAction} from "./types";


export function* watchStartWorkout(): SagaGenerator {
  yield takeLatest("StartWorkout", function* startWorkoutEffect({payload: workoutId}: StartCurrentWorkoutAction) {
    try {
      let workout: Workout | undefined;

      if (workoutId) {
        workout = yield select((state: AppState) => state.currentWorkout.workout);
        if (!workout) {
          workout = yield select((state: AppState) => state.workouts.store[workoutId]);
        }
      }

      if (!workout || !workout.id) {
        const date = Date.now();
        workout = {
          id: date.toString(),
          date,
          exercises: {},
        };
      }

      yield put(loadWorkout(workout));

      navigation.navigate("CurrentWorkoutScreen", undefined);

    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
    }
  });
}
