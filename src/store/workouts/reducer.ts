import {WorkoutsReducerActions, WorkoutsReducerState} from "./types";


export function resetWorkoutsState(): WorkoutsReducerState {
  return {
    loading: false,
    list: [],
  };
}

const initialState = resetWorkoutsState();

function workoutsReducer(
  state: WorkoutsReducerState = initialState,
  action: WorkoutsReducerActions): WorkoutsReducerState {
  switch (action.type) {
    case "FETCH_WORKOUTS": {
      return {
        ...state,
        loading: true,
      };
    }
    case "LOAD_WORKOUTS": {
      const {list} = action;
      return {
        ...state,
        list,
        loading: false,
      };
    }
    case "FAIL_FETCH_WORKOUTS": {
      return {
        ...state,
        loading: false,
      };
    }
    case "RESET":
      return resetWorkoutsState();
    default:
      return state;
  }
}

export default workoutsReducer;
