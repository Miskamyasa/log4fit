import {Locales} from "../../i18";
import {ResetAction} from "../common/types";
import {Loadable} from "../types";


// server acceptable categories
export const backendCategories = Object.freeze({other: "other", base: "base"});

export type BackendCategories = keyof typeof backendCategories;

export type Categories = BackendCategories | "used" | "custom";

export type Exercise<T = Categories> = {
  id: string,
  category: T,
  icon: string,
  title: Record<Locales, string>,
  description: Record<Locales, string>,
  image: string,
};

type _State = {
  lastUpdate: number,
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
