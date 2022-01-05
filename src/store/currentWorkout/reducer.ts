import {uniq, updateWith} from "lodash";

import {Exercise} from "../exercises/types";
import {CurrentWorkoutReducerActions, CurrentWorkoutReducerState} from "./types";


export function resetCurrentWorkoutState(): CurrentWorkoutReducerState {
  return {
    loading: false,
    workout: null,
    selectedExercise: undefined,
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
        selectedExercise: undefined,
        workout: action.payload,
        loading: false,
      };
    case "AddExerciseToWorkout": {
      const {payload: exerciseId} = action;
      return {
        ...updateWith(
          state,
          ["workout", "exercises"],
          arr => uniq<Exercise["id"]>([...arr, exerciseId]),
        ),
        selectedExercise: undefined,
      };
    }
    case "ToggleSelectedExercise": {
      const {payload: exerciseId} = action;
      return {
        ...state,
        selectedExercise: state.selectedExercise === exerciseId ? undefined : exerciseId,
      };
    }
    case "Reset":
      return resetCurrentWorkoutState();
    default:
      return state;
  }
}

export default currentWorkoutReducer;
