import {ApproachesReducerState, ApproachesReducerActions} from "./types";


export function resetApproachesState(): ApproachesReducerState {
  return {
    store: {},
    bySkill: {},
    byWorkout: {},
  };
}

const initialState = resetApproachesState();

function approachesReducer(
  state: ApproachesReducerState = initialState,
  action: ApproachesReducerActions): ApproachesReducerState {
  switch (action.type) {
    case "LoadApproaches":
      return action.payload;
    case "Reset":
      return resetApproachesState();
    default:
      return state;
  }
}

export default approachesReducer;
