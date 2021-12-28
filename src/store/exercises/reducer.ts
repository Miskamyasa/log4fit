import {processResponse} from "./helpers";
import {ExercisesReducerActions, ExercisesReducerState} from "./types";


export function resetExercisesState(): ExercisesReducerState {
  return {
    loading: false,
    other: {},
    base: {},
    used: {},
  };
}

const initialState = resetExercisesState();

function exercisesReducer(
  state: ExercisesReducerState = initialState,
  action: ExercisesReducerActions): ExercisesReducerState {
  switch (action.type) {
    case "AddExercise": {
      return {
        ...state,
        loading: true,
      };
    }
    case "FetchExercises": {
      return {
        ...state,
        loading: true,
      };
    }
    case "LoadExercises": {
      const {list} = action;
      return {
        ...state,
        ...processResponse(list, state),
        loading: false,
      };
    }
    case "FailFetchExercises": {
      return {
        ...state,
        loading: false,
      };
    }
    case "Reset":
      return resetExercisesState();
    default:
      return state;
  }
}

export default exercisesReducer;
