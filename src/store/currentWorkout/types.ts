import {Approach} from "../approaches/types";
import {ResetAction} from "../common/types";
import {Exercise} from "../exercises/types";
import {Loadable} from "../types";
import {Workout} from "../workouts/types";


type _State = {
  workout: Workout | null,
};

export type CurrentWorkoutReducerState = Loadable<_State>;

export type StartCurrentWorkoutAction = {
  readonly type: "StartWorkout",
  readonly payload: Workout["id"] | undefined,
};

export type LoadCurrentWorkoutAction = {
  readonly type: "LoadWorkout",
  readonly payload: Workout,
};

export type ToggleExerciseInWorkoutAction = {
  readonly type: "ToggleExerciseInWorkout",
  readonly payload: Exercise["id"],
};

export type CurrentWorkoutReducerActions =
  | ResetAction
  | StartCurrentWorkoutAction
  | LoadCurrentWorkoutAction
  | ToggleExerciseInWorkoutAction
;
