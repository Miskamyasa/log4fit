import {
  AddExerciseToWorkoutAction,
  LoadCurrentWorkoutAction,
  StartCurrentWorkoutAction,
  ToggleSelectedExerciseAction,
} from "./types";


export function startWorkout(payload?: StartCurrentWorkoutAction["payload"]): StartCurrentWorkoutAction {
  return {
    type: "StartWorkout",
    payload,
  };
}

export function loadWorkout(payload: LoadCurrentWorkoutAction["payload"]): LoadCurrentWorkoutAction {
  return {
    type: "LoadWorkout",
    payload,
  };
}

export function addExerciseToWorkoutAction(payload: AddExerciseToWorkoutAction["payload"])
  : AddExerciseToWorkoutAction {
  return {
    type: "AddExerciseToWorkout",
    payload,
  };
}

export function toggleExerciseInWorkoutAction(payload: ToggleSelectedExerciseAction["payload"])
  : ToggleSelectedExerciseAction {
  return {
    type: "ToggleSelectedExercise",
    payload,
  };
}
