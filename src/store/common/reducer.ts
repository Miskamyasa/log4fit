import type {CommonReducerActions, CommonReducerState} from "./types"

export function resetCommonState(): CommonReducerState {
    return {} as never
}

function commonReducer(
    state = resetCommonState(),
    action: CommonReducerActions): CommonReducerState {
    switch (action.type) {
        case "Reset":
            return resetCommonState()
        default:
            return state
    }
}

export default commonReducer
