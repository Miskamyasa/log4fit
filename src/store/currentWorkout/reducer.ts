import {keys} from "lodash";

import {CurrentWorkoutReducerActions, CurrentWorkoutReducerState} from "./types";


export function resetCurrentWorkoutState(): CurrentWorkoutReducerState {
  return {
    loading: false,
    workout: null,
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
        workout: action.payload,
        loading: false,
      };
    case "ToggleExerciseInWorkout":
      if (!state.workout) {
        return state;
      }
      const {payload: id} = action;
      const {exercises} = state.workout;
      if (exercises[id]) {
        delete exercises[id];
      } else {
        exercises[id] = {id, approaches: [], order: keys(exercises).length};
      }
      return {
        ...state,
        workout: {
          ...state.workout,
          exercises,
        },
      };
    case "Reset":
      return resetCurrentWorkoutState();
    default:
      return state;
  }
}

export default currentWorkoutReducer;
