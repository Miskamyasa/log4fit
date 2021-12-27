import {ResetAction} from "../common/types";


export type WorkoutsListItem = {
  id: string,
};

export type WorkoutsResponse = WorkoutsListItem[];

export type WorkoutsReducerState = {
  loading: boolean,
  list: WorkoutsResponse,
};

export type FetchWorkoutsAction = {
  type: "FETCH_WORKOUTS",
};

export type LoadWorkoutsAction = {
  type: "LOAD_WORKOUTS",
  list: WorkoutsResponse,
};

export type FailFetchWorkoutsAction = {
  type: "FAIL_FETCH_WORKOUTS",
};

export type WorkoutsReducerActions =
  | ResetAction
  | FetchWorkoutsAction
  | LoadWorkoutsAction
  | FailFetchWorkoutsAction
;
