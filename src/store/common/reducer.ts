import {CommonReducerActions, CommonReducerState} from "./types";

function initialState(): CommonReducerState {
  return {};
}

function commonReducer(
  state: CommonReducerState = initialState(),
  action: CommonReducerActions): CommonReducerState {
  switch (action.type) {
    case "RESET": {
      return initialState();
    }
    default:
      return state;
  }
}

export default commonReducer;
