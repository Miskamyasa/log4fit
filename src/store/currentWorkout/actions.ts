import {LoadCurrentWorkoutAction, StartCurrentWorkoutAction, WorkoutID} from "./types";


export function startWorkout(payload?: WorkoutID): StartCurrentWorkoutAction {
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
