import {takeLeading} from "@redux-saga/core/effects";
import {DocumentReference, QuerySnapshot, where} from "firebase/firestore";
import {uniq} from "lodash";
import {all, call, put, select, takeEvery, cancel} from "redux-saga/effects";

import {createDocument, getCollectionSnapshot, refs} from "../../firebase";
import {__create} from "../../i18";
import {AppState, SagaGenerator} from "../types";
import {failFetchExercises, loadExercises} from "./actions";
import {
  AddCustomExerciseAction,
  BackendCategories,
  backendCategories,
  Exercise,
  ExercisesReducerState,
  LoadExercisesAction,
} from "./types";


function createCustomExercise(id: string, title: string): Exercise<"custom"> {
  return {
    id,
    title: __create(title),
    category: "custom",
    icon: "",
    description: __create(""),
    image: "",
  };
}

type CustomExerciseDoc = {
  title: string,
  user: string,
  updatedAt: number,
};

export function* watchAddCustomExercise(): SagaGenerator {
  yield takeEvery("AddCustomExercise", function* addCustomExerciseEffect({payload: title}: AddCustomExerciseAction) {
    try {
      const queryConstraints = [
        where("title", "==", title),
        where("user", "==", "1"), // FIXME set actual user id
      ];

      const collectionSnapshot: QuerySnapshot<CustomExerciseDoc> = yield call(
        getCollectionSnapshot,
        refs.customExercises,
        queryConstraints,
      );

      if (!collectionSnapshot || !collectionSnapshot.docs.length) {
        const {store, ids, updatedAt}: ExercisesReducerState = yield select((state: AppState) => state.exercises);

        const data: CustomExerciseDoc = {
          title,
          user: "1", // FIXME set actual user id
          updatedAt: Date.now(),
        };

        const ref: DocumentReference = yield call(createDocument, refs.customExercises, data);

        if (ref?.id) {
          const {id} = ref;
          store[id] = createCustomExercise(id, title);
          ids.custom.push(id);

          const payload: LoadExercisesAction["payload"] = {
            updatedAt,
            store,
            ids: {
              ...ids,
              custom: uniq(ids.custom),
            },
          };

          yield put(loadExercises(payload));
        }

      }

    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);

      // TODO retry failed creation
    }
  });
}

export function* watchFetchExercises(): SagaGenerator {
  yield takeLeading("FetchExercises", function* fetchExercisesEffect() {
    try {
      const {store, ids, updatedAt}: ExercisesReducerState = yield select((state: AppState) => state.exercises);

      const queryConstraints = [where("updatedAt", ">", updatedAt)];

      const [mainSnapshot, customSnapshot]: [
        main: QuerySnapshot<Exercise<BackendCategories>>,
        custom: QuerySnapshot<CustomExerciseDoc>
      ] = yield all([
        call(getCollectionSnapshot, refs.exercises, queryConstraints),
        call(getCollectionSnapshot, refs.customExercises, queryConstraints),
      ]);

      if (customSnapshot) {
        for (const customDoc of customSnapshot.docs.values()) {
          const id = customDoc.id;
          const data = customDoc.data();
          if (data.title) {
            store[id] = createCustomExercise(id, data.title);
            ids.custom.push(id);
          }
        }
      }

      if (mainSnapshot) {
        for (const mainDoc of mainSnapshot.docs.values()) {
          const id = mainDoc.id;
          const data = mainDoc.data();
          if (backendCategories[data.category]) {
            store[id] = {...data, id};
            ids[data.category].push(id);
          }
        }
      }

      const payload: LoadExercisesAction["payload"] = {
        updatedAt: Date.now() - 10000,
        store,
        ids: {
          custom: uniq(ids.custom),
          other: uniq(ids.other),
          base: uniq(ids.base),
        },
      };
      yield put(loadExercises(payload));

    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);

      yield put(failFetchExercises());
    }
  });
}
