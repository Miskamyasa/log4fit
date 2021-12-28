export type CommonReducerState = {
  welcome: boolean,
};

export type ResetAction = {
  readonly type: "Reset",
};

export type WelcomeCompleteAction = {
  readonly type: "WelcomeComplete",
};

export type CommonReducerActions =
  | ResetAction
  | WelcomeCompleteAction
;
