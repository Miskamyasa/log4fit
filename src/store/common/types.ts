export type CommonReducerState = {
  welcome: boolean,
};

export type ResetAction = {
  readonly type: "RESET",
};

export type WelcomeCompleteAction = {
  readonly type: "WELCOME_COMPLETE",
};

export type CommonReducerActions =
  | ResetAction
  | WelcomeCompleteAction
;
