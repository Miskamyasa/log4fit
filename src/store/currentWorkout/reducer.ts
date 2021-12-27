import {CurrentWorkoutReducerActions, CurrentWorkoutReducerState} from "./types";


export function resetCurrentWorkoutState(): CurrentWorkoutReducerState {
  return {
    loading: false,
  };
}

const initialState = resetCurrentWorkoutState();

function currentWorkoutReducer(
  state: CurrentWorkoutReducerState = initialState,
  action: CurrentWorkoutReducerActions): CurrentWorkoutReducerState {
  switch (action.type) {
    case "START_WORKOUT":
      return {
        ...state,
      };
    case "RESET":
      return resetCurrentWorkoutState();
    default:
      return state;
  }
}

export default currentWorkoutReducer;
