import {SkillsReducerActions, SkillsReducerState} from "./types"


export function resetSkillsState(): SkillsReducerState {
  return {
    loading: false,
    store: {},
    ids: {
      base: [],
      other: [],
      custom: [],
    },
  }
}

const initialState = resetSkillsState()

function skillsReducer(
  state: SkillsReducerState = initialState,
  action: SkillsReducerActions): SkillsReducerState {
  switch (action.type) {
    case "FetchSkills":
    case "AddCustomSkill": {
      return {
        ...state,
        loading: true,
      }
    }
    case "LoadSkills": {
      return {
        ...action.payload,
        loading: false,
      }
    }
    case "FailFetchSkills": {
      return {
        ...state,
        loading: false,
      }
    }
    case "Reset":
      return resetSkillsState()
    default:
      return state
  }
}

export default skillsReducer
