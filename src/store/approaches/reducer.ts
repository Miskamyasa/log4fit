import {ApproachesReducerState, ApproachesReducerActions} from "./types";


export function resetWorkoutsState(): ApproachesReducerState {
  return {
    loading: false,
    store: {},
    byExercise: {},
    byWorkout: {},
  };
}

const initialState = resetWorkoutsState();

function approachesReducer(
  state: ApproachesReducerState = initialState,
  action: ApproachesReducerActions): ApproachesReducerState {
  switch (action.type) {
    case "FetchApproaches":
      return {
        ...state,
        loading: true,
      };
    case "LoadApproaches":
      return {
        ...action.payload,
        loading: false,
      };
    case "FailFetchApproaches":
      return {
        ...state,
        loading: false,
      };
    case "Reset":
      return resetWorkoutsState();
    default:
      return state;
  }
}

export default approachesReducer;
