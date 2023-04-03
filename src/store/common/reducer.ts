import {CommonReducerActions, CommonReducerState} from "./types"


export function resetCommonState(): CommonReducerState {
    return {
        welcome: false,
    }
}

function commonReducer(
    state = resetCommonState(),
    action: CommonReducerActions): CommonReducerState {
    switch (action.type) {
        case "WelcomeComplete":
            return {
                ...state,
                welcome: false,
            }
        case "Reset":
            return resetCommonState()
        default:
            return state
    }
}

export default commonReducer
