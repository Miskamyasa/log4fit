import {FailFetchApproachesAction, FetchApproachesAction, LoadApproachesAction} from "./types";

export function fetchApproaches(payload: FetchApproachesAction["payload"]): FetchApproachesAction {
  return {
    type: "FetchApproaches",
    payload,
  };
}

export function loadApproaches(payload: LoadApproachesAction["payload"]): LoadApproachesAction {
  return {
    type: "LoadApproaches",
    payload,
  };
}

export function failFetchApproaches(): FailFetchApproachesAction {
  return {
    type: "FailFetchApproaches",
  };
}
