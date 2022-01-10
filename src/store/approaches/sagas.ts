import {call, put, select, takeLatest} from "redux-saga/effects";

import {DB_Approach, getApproaches} from "../../db/Approaches";
import {AppState, SagaGenerator} from "../types";
import {failFetchApproaches, loadApproaches} from "./actions";
import {ApproachesReducerState, FetchApproachesAction, LoadApproachesAction} from "./types";


export function* watchFetchApproaches(): SagaGenerator {
  yield takeLatest("FetchApproaches", function* fetchApproachesEffect({payload: workoutId}: FetchApproachesAction) {
    try {
      const snapshot: DB_Approach[] = yield call(getApproaches, {workoutId});

      if (Array.isArray(snapshot) && snapshot.length > 0) {
        const {
          store,
          byWorkout,
          byExercise,
        }: ApproachesReducerState = yield select((state: AppState) => state.approaches);

        for (const doc of snapshot) {
          const {id} = doc;

          store[id] = doc;

          if (!byExercise[doc.exerciseId]) {
            byExercise[doc.exerciseId] = [];
          }

          byExercise[doc.exerciseId].push(id);

          if (!byWorkout[workoutId]) {
            byWorkout[workoutId] = [];
          }

          byWorkout[workoutId].push(id);
        }

        const payload: LoadApproachesAction["payload"] = {
          store,
          byWorkout,
          byExercise,
        };

        yield put(loadApproaches(payload));
      }

      yield put(failFetchApproaches());

    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);

      yield put(failFetchApproaches());
    }
  });
}
