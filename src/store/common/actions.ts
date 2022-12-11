import {ChangeStepAction, ResetAction, WelcomeCompleteAction} from "./types";


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

export function changeStep(payload: ChangeStepAction["payload"]): ChangeStepAction {
  return {
    type: "ChangeStep",
    payload,
  };
}
