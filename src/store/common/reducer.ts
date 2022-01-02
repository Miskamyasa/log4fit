import {CommonReducerActions, CommonReducerState} from "./types";


export function resetCommonState(): CommonReducerState {
  return {
    welcome: false,
    showWarmups: true,
  };
}

const initialState = resetCommonState();

function commonReducer(
  state: CommonReducerState = initialState,
  action: CommonReducerActions): CommonReducerState {
  switch (action.type) {
    case "WelcomeComplete":
      return {
        ...state,
        welcome: false,
      };
    case "Reset":
      return resetCommonState();
    default:
      return state;
  }
}

export default commonReducer;
