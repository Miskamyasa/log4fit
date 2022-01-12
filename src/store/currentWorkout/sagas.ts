import {isEmpty, uniq, updateWith} from "lodash";
import {call, put, select, takeLatest} from "redux-saga/effects";

import {DB_Approach, saveApproach} from "../../db/Approaches";
import {saveWorkout} from "../../db/Workouts";
import ErrorHandler from "../../helpers/ErrorHandler";
import {navigation} from "../../navigation/config";
import {fetchApproaches} from "../approaches/actions";
import {Approach, ApproachesReducerState} from "../approaches/types";
import {Exercise} from "../exercises/types";
import {AppState, SagaGenerator} from "../types";
import {Workout} from "../workouts/types";
import {failLoadWorkout, loadWorkout} from "./actions";
import {
  AddApproachAction,
  AddExerciseToWorkoutAction,
  CurrentWorkoutReducerState,
  StartCurrentWorkoutAction,
} from "./types";


export function* watchAddApproach(): SagaGenerator {
  yield takeLatest("AddApproach", function* addApproachEffect({payload}: AddApproachAction) {
    try {
      const doc: DB_Approach = yield call(saveApproach, payload);

      const {workout, approaches}: CurrentWorkoutReducerState = yield select((state: AppState) => state.currentWorkout);

      const arr = approaches[doc.exerciseId] ? [...approaches[doc.exerciseId]] : [];

      arr.push(doc);

      yield put(fetchApproaches(doc.workoutId));

      yield put(loadWorkout({
        workout,
        approaches: updateWith(approaches, [doc.exerciseId], () => arr),
      }));

    } catch (e) {
      ErrorHandler(e);
    }
  });
}

export function* watchAddExercise(): SagaGenerator {
  yield takeLatest("AddExerciseToWorkout", function* addExerciseEffect({payload}: AddExerciseToWorkoutAction) {
    try {
      const {workout, approaches}: CurrentWorkoutReducerState = yield select((state: AppState) => state.currentWorkout);

      if (!workout) {
        return;
      }

      workout.exercises = uniq([...workout.exercises, payload]);

      yield call(saveWorkout, workout);

      yield put(loadWorkout({workout, approaches}));

    } catch (e) {
      ErrorHandler(e);
    }
  });
}

export function* watchStartWorkout(): SagaGenerator {
  yield takeLatest("StartWorkout", function* startWorkoutEffect({payload: workoutId}: StartCurrentWorkoutAction) {
    try {
      if (!workoutId) {
        const date = Date.now();
        const workout: Workout = yield call(saveWorkout, {date, exercises: []});

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
        navigation.navigate("HomeScreen", undefined);
        return;
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
      navigation.navigate("CurrentWorkoutScreen", undefined);

    } catch (e) {
      ErrorHandler(e);
    }
  });
}
