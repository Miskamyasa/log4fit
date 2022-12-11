import {CommonReducerActions, CommonReducerState} from "./types";


export function resetCommonState(): CommonReducerState {
  return {
    welcome: false,
    weightSteps: {},
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
    case "ChangeStep":
      return {
        ...state,
        weightSteps: {
          ...state.weightSteps,
          [action.payload.skillId]: action.payload.value,
        },
      };
    case "Reset":
      return resetCommonState();
    default:
      return state;
  }
}

export default commonReducer;
