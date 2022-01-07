import {isEmpty} from "lodash";
import {put, select, takeLatest} from "redux-saga/effects";

import {navigation} from "../../navigation/config";
import {Approach, ApproachesReducerState} from "../approaches/types";
import {Exercise} from "../exercises/types";
import {AppState, SagaGenerator} from "../types";
import {Workout} from "../workouts/types";
import {failLoadWorkout, loadWorkout} from "./actions";
import {CurrentWorkoutReducerState, StartCurrentWorkoutAction} from "./types";


export function* watchStartWorkout(): SagaGenerator {
  yield takeLatest("StartWorkout", function* startWorkoutEffect({payload: workoutId}: StartCurrentWorkoutAction) {
    try {
      if (!workoutId) {
        const date = Date.now();
        const workout: Workout = {
          id: date.toString(), // TODO create workout in firestore
          date,
          exercises: [],
        };

        yield put(loadWorkout({workout, approaches: {}}));
        navigation.navigate("CurrentWorkoutScreen", undefined);
        return;
      }

      const currentWorkout: Workout | null = yield select((state: AppState) => state.currentWorkout.workout);

      if (currentWorkout && currentWorkout.id == workoutId) {
        yield put(failLoadWorkout());
        navigation.navigate("CurrentWorkoutScreen", undefined);
        return;
      }

      const workout: Workout | null = yield select((state: AppState) => state.workouts.store[workoutId]);

      if (!workout) {
        yield put(failLoadWorkout());
      }

      const approaches: Record<Exercise["id"], Approach[]> = {};

      const ids: Array<Approach["id"]> = yield select((state: AppState) => state.approaches.byWorkout[workoutId]);

      if (!isEmpty(ids)) {
        const store: ApproachesReducerState["store"] = yield select((state: AppState) => state.approaches.store);
        for (const id of ids) {
          const item = store[id];
          if (!isEmpty(item)) {
            if (!approaches[item.exerciseId]) {
              approaches[item.exerciseId] = [];
            }
            approaches[item.exerciseId].push(item);
          }
        }
      }

      yield put(loadWorkout({workout, approaches}));

    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);

      yield put(failLoadWorkout());
    }
  });
}
