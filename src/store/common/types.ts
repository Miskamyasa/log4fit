import {Skill} from "../skills/types"


export type MultiplicationValues = 1 | 2 | 5 | 10

export type CommonReducerState = {
  welcome: boolean,
  weightSteps: Record<Skill["id"], MultiplicationValues>,
}

export type ResetAction = {
  type: "Reset",
}

export type WelcomeCompleteAction = {
  type: "WelcomeComplete",
}


export type ChangeStepAction = {
  type: "ChangeStep",
  payload: {
    skillId: Skill["id"],
    value: MultiplicationValues,
  },
}

export type CommonReducerActions =
  | ResetAction
  | WelcomeCompleteAction
  | ChangeStepAction
