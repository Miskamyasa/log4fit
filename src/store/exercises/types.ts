import {DB_BackendCategories, DB_Exercise} from "../../db/Exercises";
import {ResetAction} from "../common/types";
import {Loadable} from "../types";


export type Categories = DB_BackendCategories | "custom";
export type Exercise = DB_Exercise<Categories>;

type _State = {
  store: Record<Exercise["id"], Exercise>,
  ids: Record<Categories, Array<Exercise["id"]>>,
};

export type ExercisesReducerState = Loadable<_State>;

export type AddCustomExerciseAction = {
  type: "AddCustomExercise",
  payload: string,
};

export type FetchExercisesAction = {
  type: "FetchExercises",
};

export type LoadExercisesAction = {
  type: "LoadExercises",
  payload: _State,
};

export type FailFetchExercisesAction = {
  type: "FailFetchExercises",
};

export type ExercisesReducerActions =
  | ResetAction
  | AddCustomExerciseAction
  | FetchExercisesAction
  | LoadExercisesAction
  | FailFetchExercisesAction
;
