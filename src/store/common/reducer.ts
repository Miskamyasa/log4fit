import {CommonReducerActions, CommonReducerState} from "./types";


function initialState(): CommonReducerState {
  return {
    welcome: true,
  };
}

function commonReducer(
  state: CommonReducerState = initialState(),
  action: CommonReducerActions): CommonReducerState {
  switch (action.type) {
    case "RESET":
      return initialState();
    case "WELCOME_COMPLETE":
      return {
        ...state,
        welcome: false,
      };
    default:
      return state;
  }
}

export default commonReducer;
