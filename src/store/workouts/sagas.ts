import {takeLeading} from "@redux-saga/core/effects";
import {uniq} from "lodash";
import {call, put, select} from "redux-saga/effects";

import {DB_Workout, getWorkouts} from "../../db/Workouts";
import {fetchApproaches} from "../approaches/actions";
import {AppState, SagaGenerator} from "../types";
import {failFetchWorkouts, loadWorkouts} from "./actions";
import {LoadWorkoutsAction, WorkoutsReducerState} from "./types";


export function* watchFetchWorkouts(): SagaGenerator {
  yield takeLeading("FetchWorkouts", function* fetchWorkoutsEffect() {
    try {
      const snapshot: DB_Workout[] = yield call(getWorkouts);

      if (snapshot) {
        const {store, ids}: WorkoutsReducerState = yield select((state: AppState) => state.workouts);

        for (const doc of snapshot) {
          const {id} = doc;
          store[id] = doc;
          ids.push(id);
          yield put(fetchApproaches(id));
        }

        const payload: LoadWorkoutsAction["payload"] = {store, ids: uniq(ids)};

        yield put(loadWorkouts(payload));
      }

    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);

      yield put(failFetchWorkouts());
    }
  });
}
