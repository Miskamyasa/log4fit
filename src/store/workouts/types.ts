import {ResetAction} from "../common/types";


export type Workout = {
  id: string,
};

export type WorkoutsResponse = Array<Workout>;

export type WorkoutsReducerState = {
  loading: boolean,
  list: WorkoutsResponse,
};

export type FetchWorkoutsAction = {
  type: "FetchWorkouts",
};

export type LoadWorkoutsAction = {
  type: "LoadWorkouts",
  list: WorkoutsResponse,
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
