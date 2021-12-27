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
    case "ADD_EXERCISE": {
      return {
        ...state,
        loading: true,
      };
    }
    case "FETCH_EXERCISES": {
      return {
        ...state,
        loading: true,
      };
    }
    case "LOAD_EXERCISES": {
      const {list} = action;
      return {
        ...state,
        ...processResponse(list, state),
        loading: false,
      };
    }
    case "FAIL_FETCH_EXERCISES": {
      return {
        ...state,
        loading: false,
      };
    }
    case "RESET":
      return resetExercisesState();
    default:
      return state;
  }
}

export default exercisesReducer;
