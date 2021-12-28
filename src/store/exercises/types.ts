import {ResetAction} from "../common/types";


type ExerciseID = string;
export type Categories = "other" | "base" | "used";

export type Exercise = {
  id: ExerciseID,
  updatedAt: string,
  category: Categories,
  icon: string,
  title: string,
  description: string,
  image: string,
};

export type ExercisesResponse = Array<Exercise>;

export type ExerciseCollection = Record<ExerciseID, Exercise>;
export type Collections = Record<Categories, ExerciseCollection>;

export type ExercisesReducerState = Collections & {loading: boolean};

export type AddExercisesAction = {
  type: "AddExercise",
  item: Exercise,
};

export type FetchExercisesAction = {
  type: "FetchExercises",
};

export type LoadExercisesAction = {
  type: "LoadExercises",
  list: ExercisesResponse,
};

export type FailFetchExercisesAction = {
  type: "FailFetchExercises",
};

export type ExercisesReducerActions =
  | ResetAction
  | AddExercisesAction
  | FetchExercisesAction
  | LoadExercisesAction
  | FailFetchExercisesAction
;
