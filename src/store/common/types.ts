export type CommonReducerState = {
  welcome: boolean,
  showWarmups: boolean,
  userId: string | undefined,
};

export type SetUserIdAction = {
  readonly type: "SetUserId",
  readonly payload: string,
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
  | SetUserIdAction
;
