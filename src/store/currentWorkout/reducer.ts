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
      const exerciseId = action.payload;
      const set = new Set(state.workout?.exercises);
      set.has(exerciseId) ? set.delete(exerciseId) : set.add(exerciseId);
      return {
        ...state,
        workout: {
          ...state.workout,
          exercises: Array.from(set.values()),
        },
      };
    case "Reset":
      return resetCurrentWorkoutState();
    default:
      return state;
  }
}

export default currentWorkoutReducer;
