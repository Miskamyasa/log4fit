import {ResetAction} from "../common/types";


type ExercisesListItemId = string;
export type Categories = "other" | "base" | "used";

export type ExercisesListItem = {
  id: ExercisesListItemId,
  updatedAt: string,
  category: Categories,
  icon: string,
  title: string,
  description: string,
  image: string,
};

export type ExercisesResponse = ExercisesListItem[];

export type ExerciseCollection = Record<ExercisesListItemId, ExercisesListItem>;
export type Collections = Record<Categories, ExerciseCollection>;

export type ExercisesReducerState = Collections & {loading: boolean};

export type AddExercisesAction = {
  type: "ADD_EXERCISE",
  item: ExercisesListItem,
};

export type FetchExercisesAction = {
  type: "FETCH_EXERCISES",
};

export type LoadExercisesAction = {
  type: "LOAD_EXERCISES",
  list: ExercisesResponse,
};

export type FailFetchExercisesAction = {
  type: "FAIL_FETCH_EXERCISES",
};

export type ExercisesReducerActions =
  | ResetAction
  | AddExercisesAction
  | FetchExercisesAction
  | LoadExercisesAction
  | FailFetchExercisesAction
;
