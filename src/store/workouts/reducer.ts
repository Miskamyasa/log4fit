import {WorkoutsReducerActions, WorkoutsReducerState} from "./types";


export function resetWorkoutsState(): WorkoutsReducerState {
  return {
    store: {},
    ids: [],
    current: null,
  };
}

const initialState = resetWorkoutsState();

function workoutsReducer(
  state: WorkoutsReducerState = initialState,
  action: WorkoutsReducerActions): WorkoutsReducerState {
  switch (action.type) {
    case "LoadWorkouts": {
      return action.payload;
    }
    case "Reset":
      return resetWorkoutsState();
    default:
      return state;
  }
}

export default workoutsReducer;
