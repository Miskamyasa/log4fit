export type CommonReducerState = never

export type ResetAction = {
    type: "Reset"
}

export type WelcomeCompleteAction = {
    type: "WelcomeComplete"
}

export type CommonReducerActions =
  | ResetAction
  | WelcomeCompleteAction
