import type {AppState} from "../types"

import type {WorkoutsReducerState} from "./types"

export function selectWorkouts(state: AppState): WorkoutsReducerState {
    return state.workouts
}
