import {isEmpty} from "lodash";
import {put, takeLatest} from "redux-saga/effects";

import {navigate} from "../../navigation/config";
import {SagaGenerator} from "../types";
import {loadWorkout} from "./actions";
import {LoadCurrentWorkoutAction, StartCurrentWorkoutAction} from "./types";


export function* watchLoadWorkout(): SagaGenerator {
  yield takeLatest("LoadWorkout", function* loadWorkoutEffect({payload}: LoadCurrentWorkoutAction) {
    try {
      if (isEmpty(payload.exercises)) {
        return navigate("ExercisesScreen", undefined);
      }
      return navigate("WorkoutScreen", undefined);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  });
}

export function* watchStartWorkout(): SagaGenerator {
  yield takeLatest("StartWorkout", function* startWorkoutEffect({payload: workoutID}: StartCurrentWorkoutAction) {
    // сделать загрузку тренировки из стейта
    try {
      const workout = {};
      if (workoutID) {
        workout = {id: "1"}; // TODO get workout from state;
        yield put(loadWorkout({workout, exercises: []}));
      } else {
        workout.id = Date.now().toString();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  });
}
