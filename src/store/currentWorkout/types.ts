import {ResetAction} from "../common/types";


export type CurrentWorkout = {
  id: string,
};

export type CurrentWorkoutReducerState = {
  loading: boolean,
  data?: CurrentWorkout,
};

export type StartCurrentWorkoutAction = {
  readonly type: "START_WORKOUT",
};

export type CurrentWorkoutReducerActions =
  | ResetAction
  | StartCurrentWorkoutAction
;
