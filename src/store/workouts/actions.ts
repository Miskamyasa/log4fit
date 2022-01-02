import {FailFetchWorkoutsAction, FetchWorkoutsAction, LoadWorkoutsAction} from "./types";


export function fetchWorkouts(): FetchWorkoutsAction {
  return {
    type: "FetchWorkouts",
  };
}

export function loadWorkouts(payload: LoadWorkoutsAction["payload"]): LoadWorkoutsAction {
  return {
    type: "LoadWorkouts",
    payload,
  };
}

export function failFetchWorkouts(): FailFetchWorkoutsAction {
  return {
    type: "FailFetchWorkouts",
  };
}
