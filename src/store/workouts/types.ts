import {DB_Workout} from "../../db/Workouts";
import {ResetAction} from "../common/types";
import {Loadable} from "../types";


export type Workout = DB_Workout;

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
