import {ResetAction, SetUserIdAction, WelcomeCompleteAction} from "./types";


export function reset(): ResetAction {
  return {
    type: "Reset",
  };
}

export function welcomeComplete(): WelcomeCompleteAction {
  return {
    type: "WelcomeComplete",
  };
}

export function setUserId(payload: SetUserIdAction["payload"]): SetUserIdAction {
  return {
    type: "SetUserId",
    payload,
  };
}
