import {WorkoutsReducerActions, WorkoutsReducerState} from "./types";


export function resetWorkoutsState(): WorkoutsReducerState {
  return {
    loading: false,
    store: {},
    ids: [],
  };
}

const initialState = resetWorkoutsState();

function workoutsReducer(
  state: WorkoutsReducerState = initialState,
  action: WorkoutsReducerActions): WorkoutsReducerState {
  switch (action.type) {
    case "FetchWorkouts": {
      return {
        ...state,
        loading: true,
      };
    }
    case "LoadWorkouts": {
      return {
        ...action.payload,
        loading: false,
      };
    }
    case "FailFetchWorkouts": {
      return {
        ...state,
        loading: false,
      };
    }
    case "Reset":
      return resetWorkoutsState();
    default:
      return state;
  }
}

export default workoutsReducer;
