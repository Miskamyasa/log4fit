import {
  WorkoutsListItem, FailFetchWorkoutsAction, FetchWorkoutsAction, LoadWorkoutsAction,
} from "./types";


export function fetchWorkouts(): FetchWorkoutsAction {
  return {
    type: "FetchWorkouts",
  };
}

export function loadWorkouts(list: Array<WorkoutsListItem>): LoadWorkoutsAction {
  return {
    type: "LoadWorkouts",
    list,
  };
}

export function failFetchWorkouts(): FailFetchWorkoutsAction {
  return {
    type: "FailFetchWorkouts",
  };
}
