import {LoadCurrentWorkoutAction, StartCurrentWorkoutAction, ToggleExerciseInWorkoutAction} from "./types";


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

export function toggleExerciseInWorkoutAction(payload: ToggleExerciseInWorkoutAction["payload"])
  : ToggleExerciseInWorkoutAction {
  return {
    type: "ToggleExerciseInWorkout",
    payload,
  };
}
