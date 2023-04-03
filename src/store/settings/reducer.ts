import {SettingsReducerActions, SettingsReducerState} from "./types"


function resetSettingsState(): SettingsReducerState {
  return {
    weightSteps: {},
  }
}


function settingsReducer(state = resetSettingsState(), action: SettingsReducerActions): SettingsReducerState {
  switch (action.type) {
    case "ChangeStep":
      return {
        ...state,
        weightSteps: {
          ...state.weightSteps,
          [action.payload.skillId]: action.payload.value,
        },
      }
    default:
      return state
  }
}

export default settingsReducer
