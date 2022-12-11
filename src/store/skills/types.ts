import {Locales} from "../../i18";
import {ResetAction} from "../common/types";
import {ID, Loadable} from "../types";


export type Categories = "custom" | "other" | "base";

export type Skill = {
  id: ID,
  category: Categories,
  icon: string,
  title: Record<Locales, string>,
  description: Record<Locales, string>,
  image: string,
};


type _State = {
  store: Record<Skill["id"], Skill>,
  ids: Record<Categories, Array<Skill["id"]>>,
};

export type SkillsReducerState = Loadable<_State>;

export type AddCustomSkillAction = {
  type: "AddCustomSkill",
  payload: string,
};

export type FetchSkillsAction = {
  type: "FetchSkills",
};

export type LoadSkillsAction = {
  type: "LoadSkills",
  payload: _State,
};

export type FailFetchSkillsAction = {
  type: "FailFetchSkills",
};

export type SkillsReducerActions =
  | ResetAction
  | AddCustomSkillAction
  | FetchSkillsAction
  | LoadSkillsAction
  | FailFetchSkillsAction
;
