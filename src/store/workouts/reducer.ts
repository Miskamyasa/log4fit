import {WorkoutsReducerActions, WorkoutsReducerState} from "./types"


export function resetWorkoutsState(): WorkoutsReducerState {
    return {
        loading: false,
        store: {},
        ids: [],
        current: null,
    }
}

function workoutsReducer(
    state: WorkoutsReducerState = resetWorkoutsState(),
    action: WorkoutsReducerActions): WorkoutsReducerState {
    switch (action.type) {
        case "AddWorkout": {
            return {
                ...state,
                loading: true,
            }
        }
        case "LoadWorkouts": {
            return {
                ...action.payload,
                loading: false,
            }
        }
        case "Reset":
            return resetWorkoutsState()
        default:
            return state
    }
}

export default workoutsReducer
