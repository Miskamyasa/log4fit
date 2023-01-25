import {AddApproachAction, LoadApproachesAction} from "./types"


export function addApproach(payload: AddApproachAction["payload"]): AddApproachAction {
  return {
    type: "AddApproach",
    payload,
  }
}

export function loadApproaches(payload: LoadApproachesAction["payload"]): LoadApproachesAction {
  return {
    type: "LoadApproaches",
    payload,
  }
}
