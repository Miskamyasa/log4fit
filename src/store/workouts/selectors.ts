import {AppState} from "../types"

import {WorkoutsReducerState} from "./types"


export function selectWorkouts(state: AppState): WorkoutsReducerState {
    return state.workouts
}
