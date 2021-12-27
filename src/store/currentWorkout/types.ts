import {ResetAction} from "../common/types";


export type CurrentWorkout = {
  id: string,
};

export type CurrentWorkoutReducerState = Record<string, never> | CurrentWorkout;

export type StartCurrentWorkoutAction = {
  readonly type: "START_WORKOUT",
};

export type CurrentWorkoutReducerActions =
  | ResetAction
  | StartCurrentWorkoutAction
;
