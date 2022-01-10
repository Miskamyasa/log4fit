import {ExercisesReducerActions, ExercisesReducerState} from "./types";


export function resetExercisesState(): ExercisesReducerState {
  return {
    loading: false,
    store: {},
    ids: {
      other: [],
      base: [],
      custom: [],
    },
  };
}

const initialState = resetExercisesState();

function exercisesReducer(
  state: ExercisesReducerState = initialState,
  action: ExercisesReducerActions): ExercisesReducerState {
  switch (action.type) {
    case "FetchExercises":
    case "AddCustomExercise": {
      return {
        ...state,
        loading: true,
      };
    }
    case "LoadExercises": {
      return {
        ...action.payload,
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
