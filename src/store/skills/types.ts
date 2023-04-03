import {Locales} from "../../i18"
import {ResetAction} from "../common/types"


export type Categories = "custom" | "other" | "base"

export type Skill = {
  id: string,
  category: Categories,
  icon: string,
  title: Record<Locales, string>,
  description: Record<Locales, string>,
  image: string,
}

export type SkillsReducerState = {
  loading: boolean,
  store: Record<Skill["id"], Skill>,
  ids: Record<Categories, Array<Skill["id"]>>,
}

export type AddCustomSkillAction = {
  type: "AddCustomSkill",
  payload: string,
}

export type FetchSkillsAction = {
  type: "FetchSkills",
}

export type LoadSkillsAction = {
  type: "LoadSkills",
  payload: Omit<SkillsReducerState, "loading">,
}

export type FailFetchSkillsAction = {
  type: "FailFetchSkills",
}

export type SkillsReducerActions =
  | ResetAction
  | AddCustomSkillAction
  | FetchSkillsAction
  | LoadSkillsAction
  | FailFetchSkillsAction
