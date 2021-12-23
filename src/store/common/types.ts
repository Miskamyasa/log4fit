export type CommonReducerState = {
  welcome: boolean,
};

export type ResetAction = {
  type: "RESET",
};

export type WelcomeCompleteAction = {
  type: "WELCOME_COMPLETE",
};

export type CommonReducerActions =
  | ResetAction
  | WelcomeCompleteAction
;
