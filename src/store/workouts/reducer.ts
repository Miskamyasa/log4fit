import {WorkoutsReducerActions, WorkoutsReducerState} from "./types"


export function resetWorkoutsState(): WorkoutsReducerState {
    return {
        loading: false,
        store: {},
        ids: [],
        current: null,
    }
}

const initialState = resetWorkoutsState()

function workoutsReducer(
    state: WorkoutsReducerState = initialState,
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
