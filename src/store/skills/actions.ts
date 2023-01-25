import {
  FailFetchSkillsAction,
  FetchSkillsAction,
  LoadSkillsAction,
  AddCustomSkillAction,
} from "./types"


export function addCustomSkill(title: string): AddCustomSkillAction {
  return {
    type: "AddCustomSkill",
    payload: title,
  }
}

export function fetchSkills(): FetchSkillsAction {
  return {
    type: "FetchSkills",
  }
}

export function loadSkills(payload: LoadSkillsAction["payload"]): LoadSkillsAction {
  return {
    type: "LoadSkills",
    payload,
  }
}

export function failFetchSkills(): FailFetchSkillsAction {
  return {
    type: "FailFetchSkills",
  }
}
