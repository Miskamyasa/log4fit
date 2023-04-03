import {ResetAction, WelcomeCompleteAction} from "./types"


export function reset(): ResetAction {
  return {
    type: "Reset",
  }
}

export function welcomeComplete(): WelcomeCompleteAction {
  return {
    type: "WelcomeComplete",
  }
}
