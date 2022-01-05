import {put, select, takeLatest} from "redux-saga/effects";

import {navigation} from "../../navigation/config";
import {AppState, SagaGenerator} from "../types";
import {Workout} from "../workouts/types";
import {loadWorkout} from "./actions";
import {StartCurrentWorkoutAction} from "./types";


export function* watchStartWorkout(): SagaGenerator {
  yield takeLatest("StartWorkout", function* startWorkoutEffect({payload: workoutId}: StartCurrentWorkoutAction) {
    try {
      if (!workoutId) {
        const date = Date.now();
        const workout: Workout = {
          id: date.toString(),
          date,
          exercises: [],
        };

        yield put(loadWorkout(workout));
        navigation.navigate("CurrentWorkoutScreen", undefined);
        return;
      }

      const currentWorkout: Workout | undefined = yield select((state: AppState) => state.currentWorkout.workout);

      if (currentWorkout && currentWorkout.id == workoutId) {
        navigation.navigate("CurrentWorkoutScreen", undefined);
        return;
      }

      const workout: Workout | undefined = yield select((state: AppState) => state.workouts.store[workoutId]);

      if (workout) {
        yield put(loadWorkout(workout));
        return;
      }

    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
    }
  });
}
