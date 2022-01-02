import {takeLeading} from "@redux-saga/core/effects";
import {QuerySnapshot} from "firebase/firestore";
import {uniq} from "lodash";
import {call, put, select} from "redux-saga/effects";

import {getCollectionSnapshot, refs} from "../../firebase";
import {fetchApproaches} from "../approaches/actions";
import {AppState, SagaGenerator} from "../types";
import {failFetchWorkouts, loadWorkouts} from "./actions";
import {LoadWorkoutsAction, Workout, WorkoutsReducerState} from "./types";


export function* watchFetchWorkouts(): SagaGenerator {
  yield takeLeading("FetchWorkouts", function* fetchWorkoutsEffect() {
    try {
      const {store, ids}: WorkoutsReducerState = yield select((state: AppState) => state.workouts);
      const snapshot: QuerySnapshot<Workout> = yield call(getCollectionSnapshot, refs.workouts);

      for (const doc of snapshot.docs) {
        const id = doc.id;
        store[id] = {...doc.data(), id};
        ids.push(id);
        yield put(fetchApproaches(id));
      }

      const payload: LoadWorkoutsAction["payload"] = {store, ids: uniq(ids)};

      yield put(loadWorkouts(payload));

    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);

      yield put(failFetchWorkouts());
    }
  });
}
