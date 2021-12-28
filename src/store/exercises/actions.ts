import {
  ExercisesListItem,
  FailFetchExercisesAction,
  FetchExercisesAction,
  LoadExercisesAction,
  AddExercisesAction,
} from "./types";


export function addExercise(item: ExercisesListItem): AddExercisesAction {
  return {
    type: "AddExercise",
    item,
  };
}

export function fetchExercises(): FetchExercisesAction {
  return {
    type: "FetchExercises",
  };
}

export function loadExercises(list: Array<ExercisesListItem>): LoadExercisesAction {
  return {
    type: "LoadExercises",
    list,
  };
}

export function failFetchExercises(): FailFetchExercisesAction {
  return {
    type: "FailFetchExercises",
  };
}
