import {Approach} from "../approaches/types";
import {ResetAction} from "../common/types";
import {Exercise} from "../exercises/types";
import {Loadable} from "../types";


export type WorkoutExercise = {
  id: Exercise["id"],
  order: number,
  approaches: Array<Approach["id"]>,
};

export type Workout = {
  id: string,
  date: ReturnType<typeof Date.now>,
  exercises: Record<Exercise["id"], WorkoutExercise>,
};

type _State = {
  store: Record<Workout["id"], Workout>,
  ids: Array<Workout["id"]>,
};

export type WorkoutsReducerState = Loadable<_State>;

export type FetchWorkoutsAction = {
  type: "FetchWorkouts",
};

export type LoadWorkoutsAction = {
  type: "LoadWorkouts",
  payload: _State,
};

export type FailFetchWorkoutsAction = {
  type: "FailFetchWorkouts",
};

export type WorkoutsReducerActions =
  | ResetAction
  | FetchWorkoutsAction
  | LoadWorkoutsAction
  | FailFetchWorkoutsAction
;
