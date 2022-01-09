import {CommonReducerActions, CommonReducerState} from "./types";


export function resetCommonState(): CommonReducerState {
  return {
    welcome: false,
    showWarmups: true,
    userId: undefined,
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
    case "SetUserId":
      return {
        ...state,
        userId: action.payload,
      };
    case "Reset":
      return resetCommonState();
    default:
      return state;
  }
}

export default commonReducer;
