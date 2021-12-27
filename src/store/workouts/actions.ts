import {
  WorkoutsListItem, FailFetchWorkoutsAction, FetchWorkoutsAction, LoadWorkoutsAction,
} from "./types";


export function fetchWorkouts(): FetchWorkoutsAction {
  return {
    type: "FETCH_WORKOUTS",
  };
}

export function loadWorkouts(list: WorkoutsListItem[]): LoadWorkoutsAction {
  return {
    type: "LOAD_WORKOUTS",
    list,
  };
}

export function failFetchWorkouts(): FailFetchWorkoutsAction {
  return {
    type: "FAIL_FETCH_WORKOUTS",
  };
}
