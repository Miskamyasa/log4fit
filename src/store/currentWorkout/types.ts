import {Approach} from "../approaches/types";
import {ResetAction} from "../common/types";
import {Exercise} from "../exercises/types";
import {Loadable} from "../types";
import {Workout} from "../workouts/types";


type _State = {
  workout: Workout | null,
  // ↓ selected exercise to add to current workout (exercises list)
  selectedExercise: Exercise["id"] | undefined,
  approaches: Record<Exercise["id"], Approach[]>,
};

export type CurrentWorkoutReducerState = Loadable<_State>;

export type StartCurrentWorkoutAction = {
  readonly type: "StartWorkout",
  readonly payload: Workout["id"] | undefined,
};

export type LoadCurrentWorkoutAction = {
  readonly type: "LoadWorkout",
  readonly payload: Pick<_State, "workout" | "approaches">,
};

export type FailLoadCurrentWorkoutAction = {
  readonly type: "FailLoadWorkout",
};

export type AddExerciseToWorkoutAction = {
  readonly type: "AddExerciseToWorkout",
  readonly payload: Exercise["id"],
};

export type ToggleSelectedExerciseAction = {
  readonly type: "ToggleSelectedExercise",
  readonly payload: Exercise["id"],
};

export type CurrentWorkoutReducerActions =
  | ResetAction
  | StartCurrentWorkoutAction
  | LoadCurrentWorkoutAction
  | FailLoadCurrentWorkoutAction
  | AddExerciseToWorkoutAction
  | ToggleSelectedExerciseAction
;
