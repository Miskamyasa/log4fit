import {CommonReducerActions, CommonReducerState} from "./types";


export function resetCommonState(): CommonReducerState {
  return {
    welcome: true,
  };
}

const initialState = resetCommonState();

function commonReducer(
  state: CommonReducerState = initialState,
  action: CommonReducerActions): CommonReducerState {
  switch (action.type) {
    case "WELCOME_COMPLETE":
      return {
        ...state,
        welcome: false,
      };
    case "RESET":
      return resetCommonState();
    default:
      return state;
  }
}

export default commonReducer;
