import {ResetAction} from "../common/types";
import {Exercise} from "../exercises/types";
import {Workout} from "../workouts/types";


export type CurrentWorkoutReducerState = {
  loading: boolean,
  workout?: Workout,
  exercises?: Array<Exercise["id"]>,
};

export type StartCurrentWorkoutAction = {
  readonly type: "StartWorkout",
  readonly payload?: Workout["id"],
};

export type LoadCurrentWorkoutAction = {
  readonly type: "LoadWorkout",
  readonly payload: {
    workout: CurrentWorkoutReducerState["workout"],
    exercises: CurrentWorkoutReducerState["exercises"],
  },
};

export type CurrentWorkoutReducerActions =
  | ResetAction
  | StartCurrentWorkoutAction
  | LoadCurrentWorkoutAction
;
