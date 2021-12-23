import {ResetAction, WelcomeCompleteAction} from "./types";


export function reset(): ResetAction {
  return {
    type: "RESET",
  };
}

export function welcomeComplete(): WelcomeCompleteAction {
  return {
    type: "WELCOME_COMPLETE",
  };
}
