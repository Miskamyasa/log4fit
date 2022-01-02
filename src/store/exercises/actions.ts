import {
  FailFetchExercisesAction,
  FetchExercisesAction,
  LoadExercisesAction,
  AddCustomExerciseAction,
} from "./types";


export function addCustomExercise(title: string): AddCustomExerciseAction {
  return {
    type: "AddCustomExercise",
    payload: title,
  };
}

export function fetchExercises(): FetchExercisesAction {
  return {
    type: "FetchExercises",
  };
}

export function loadExercises(payload: LoadExercisesAction["payload"]): LoadExercisesAction {
  return {
    type: "LoadExercises",
    payload,
  };
}

export function failFetchExercises(): FailFetchExercisesAction {
  return {
    type: "FailFetchExercises",
  };
}
