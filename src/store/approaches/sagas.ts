import {call, put, select, takeEvery} from "redux-saga/effects";

import {DB_Approach, getApproaches} from "../../db/Approaches";
import ErrorHandler from "../../helpers/ErrorHandler";
import {AppState, SagaGenerator} from "../types";
import {failFetchApproaches, loadApproaches} from "./actions";
import {ApproachesReducerState, FetchApproachesAction, LoadApproachesAction} from "./types";


export function* watchFetchApproaches(): SagaGenerator {
  yield takeEvery("FetchApproaches", function* fetchApproachesEffect({payload: workoutId}: FetchApproachesAction) {
    try {
      const snapshot: DB_Approach[] = yield call(getApproaches, {workoutId});

      if (!Array.isArray(snapshot) || snapshot.length === 0) {
        yield put(failFetchApproaches());
        return;
      }

      const {store, byWorkout, byExercise}: ApproachesReducerState = yield select(
        (state: AppState) => state.approaches
      );

      for (const doc of snapshot) {
        const {id} = doc;

        store[id] = doc;

        const exerciseSet = new Set(byExercise[doc.exerciseId]);
        exerciseSet.add(id);
        byExercise[doc.exerciseId] = Array.from(exerciseSet.values());

        const workoutSet = new Set(byWorkout[workoutId]);
        workoutSet.add(id);
        byWorkout[workoutId] = Array.from(workoutSet.values());

      }

      const payload: LoadApproachesAction["payload"] = {
        store,
        byWorkout,
        byExercise,
      };

      yield put(loadApproaches(payload));

    } catch (e) {
      ErrorHandler(e);
    }
  });
}
