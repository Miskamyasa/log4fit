import {
  ExercisesListItem,
  FailFetchExercisesAction,
  FetchExercisesAction,
  LoadExercisesAction,
  AddExercisesAction,
} from "./types";


export function addExercise(item: ExercisesListItem): AddExercisesAction {
  return {
    type: "ADD_EXERCISE",
    item,
  };
}

export function fetchExercises(): FetchExercisesAction {
  return {
    type: "FETCH_EXERCISES",
  };
}

export function loadExercises(list: ExercisesListItem[]): LoadExercisesAction {
  return {
    type: "LOAD_EXERCISES",
    list,
  };
}

export function failFetchExercises(): FailFetchExercisesAction {
  return {
    type: "FAIL_FETCH_EXERCISES",
  };
}
