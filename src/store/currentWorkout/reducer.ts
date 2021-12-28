import {CurrentWorkoutReducerActions, CurrentWorkoutReducerState} from "./types";


export function resetCurrentWorkoutState(): CurrentWorkoutReducerState {
  return {
    loading: true,
  };
}

const initialState = resetCurrentWorkoutState();

function currentWorkoutReducer(
  state: CurrentWorkoutReducerState = initialState,
  action: CurrentWorkoutReducerActions): CurrentWorkoutReducerState {
  switch (action.type) {
    case "StartWorkout":
      return {
        ...state,
        loading: true,
      };
    case "LoadWorkout":
      return {
        ...state,
        loading: false,
        workout: action.payload.workout,
        exercises: action.payload.exercises,
      };
    case "Reset":
      return resetCurrentWorkoutState();
    default:
      return state;
  }
}

export default currentWorkoutReducer;
