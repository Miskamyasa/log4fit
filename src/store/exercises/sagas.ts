import {takeLeading} from "@redux-saga/core/effects";
import {uniq} from "lodash";
import {call, put, select, takeEvery} from "redux-saga/effects";

import {DB_CustomExercise, saveCustomExercise} from "../../db/CustomExercise";
import {backendCategories, DB_Exercise, getExercises} from "../../db/Exercises";
import ErrorHandler from "../../helpers/ErrorHandler";
import {__create} from "../../i18";
import {AppState, SagaGenerator} from "../types";
import {failFetchExercises, loadExercises} from "./actions";
import {AddCustomExerciseAction, Exercise, ExercisesReducerState, LoadExercisesAction} from "./types";


function createCustomExercise(id: string, title: string): Exercise {
  return {
    id,
    title: __create(title),
    category: "custom",
    icon: "",
    description: __create(""),
    image: "",
  };
}

export function* watchAddCustomExercise(): SagaGenerator {
  yield takeEvery("AddCustomExercise", function* addCustomExerciseEffect({payload: title}: AddCustomExerciseAction) {
    try {
      const userId: string = yield select((state: AppState) => state.common.userId);
      const {store, ids}: ExercisesReducerState = yield select((state: AppState) => state.exercises);

      let doc: Exercise | null;

      for (const id of ids.custom) {
        const item = store[id];
        if (item.title.en === title) {
          doc = item;
          yield put(failFetchExercises());
          return;
        }
      }

      const {id}: DB_CustomExercise = yield call(saveCustomExercise, {title, userId});

      doc = createCustomExercise(id, title);

      store[id] = doc;
      ids.custom.push(id);

      const payload: LoadExercisesAction["payload"] = {
        store,
        ids: {
          ...ids,
          custom: uniq(ids.custom),
        },
      };

      yield put(loadExercises(payload));

    } catch (e) {
      ErrorHandler(e);
    }
  });
}

export function* watchFetchExercises(): SagaGenerator {
  yield takeLeading("FetchExercises", function* fetchExercisesEffect() {
    try {
      const snapshot: DB_Exercise[] = yield call(getExercises);

      if (!Array.isArray(snapshot) || snapshot.length === 0) {
        yield put(failFetchExercises());
        return;
      }

      const {store, ids}: ExercisesReducerState = yield select((state: AppState) => state.exercises);

      for (const doc of snapshot) {
        const {id, category} = doc;
        if (backendCategories[category]) {
          store[id] = doc;
          ids[category].push(id);
        }
      }

      const payload: LoadExercisesAction["payload"] = {
        store,
        ids: {
          custom: ids.custom,
          other: uniq(ids.other),
          base: uniq(ids.base),
        },
      };

      yield put(loadExercises(payload));

    } catch (e) {
      ErrorHandler(e);
    }
  });
}
