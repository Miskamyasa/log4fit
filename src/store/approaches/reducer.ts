import type {ApproachesReducerState, ApproachesReducerActions} from "./types"

export function resetApproachesState(): ApproachesReducerState {
    return {
        store: {},
        bySkill: {},
        byWorkout: {},
    }
}

function approachesReducer(
    state = resetApproachesState(),
    action: ApproachesReducerActions): ApproachesReducerState {
    switch (action.type) {
        case "LoadApproaches":
            return action.payload
        case "Reset":
            return resetApproachesState()
        default:
            return state
    }
}

export default approachesReducer
