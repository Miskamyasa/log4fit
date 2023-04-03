export type CommonReducerState = {
    welcome: boolean,
}

export type ResetAction = {
    type: "Reset",
}

export type WelcomeCompleteAction = {
    type: "WelcomeComplete",
}

export type CommonReducerActions =
  | ResetAction
  | WelcomeCompleteAction
