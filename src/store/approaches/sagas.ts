import {QuerySnapshot, where} from "firebase/firestore";
import {call, put, select, takeLatest} from "redux-saga/effects";

import {getCollectionSnapshot, refs} from "../../firebase";
import {AppState, SagaGenerator} from "../types";
import {failFetchApproaches, loadApproaches} from "./actions";
import {Approach, ApproachesReducerState, FetchApproachesAction, LoadApproachesAction} from "./types";


export function* watchFetchApproaches(): SagaGenerator {
  yield takeLatest("FetchApproaches", function* fetchApproachesEffect({payload: workoutId}: FetchApproachesAction) {
    try {
      const snapshot: QuerySnapshot<Approach> = yield call(
        getCollectionSnapshot,
        refs.approaches,
        [where("workoutId", "==", workoutId)],
      );

      if (snapshot) {
        const {
          store,
          byWorkout,
          byExercise,
        }: ApproachesReducerState = yield select((state: AppState) => state.approaches);
        
        for (const doc of snapshot.docs.values()) {
          const id = doc.id;
          const data = doc.data();

          store[id] = {...data, id};

          if (!byExercise[data.exerciseId]) {
            byExercise[data.exerciseId] = [];
          }

          byExercise[data.exerciseId].push(id);

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

    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);

      yield put(failFetchApproaches());
    }
  });
}
