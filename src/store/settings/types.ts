import {ResetAction} from "../common/types"
import {Skill} from "../skills/types"


export type MultiplicationValues = 1 | 2 | 5 | 10

export interface SettingsReducerState {
  weightSteps: Record<Skill["id"], MultiplicationValues>
}

export type ChangeStepAction = {
  type: "ChangeStep",
  payload: {
    skillId: Skill["id"],
    value: MultiplicationValues,
  },
}

export type SettingsReducerActions =
  | ResetAction
  | ChangeStepAction
