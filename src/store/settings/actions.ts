import {ChangeStepAction} from "./types"


export function changeStep(payload: ChangeStepAction["payload"]): ChangeStepAction {
  return {
    type: "ChangeStep",
    payload,
  }
}
