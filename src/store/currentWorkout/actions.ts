import {StartCurrentWorkoutAction} from "./types";


export function startWorkout(): StartCurrentWorkoutAction {
  return {
    type: "START_WORKOUT",
  };
}
