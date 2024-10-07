import type {
    AddSkillToWorkoutAction,
    AddWorkoutAction,
    FailAddWorkoutAction,
    LoadWorkoutsAction,
    StartWorkoutAction,
} from "./types"

export function loadWorkouts(payload: LoadWorkoutsAction["payload"]): LoadWorkoutsAction {
    return {
        type: "LoadWorkouts",
        payload,
    }
}

export function addWorkout(): AddWorkoutAction {
    return {
        type: "AddWorkout",
    }
}

export function failAddWorkout(): FailAddWorkoutAction {
    return {
        type: "FailAddWorkout",
    }
}

export function startWorkout(payload: StartWorkoutAction["payload"]): StartWorkoutAction {
    return {
        type: "StartWorkout",
        payload,
    }
}

export function addSkillToWorkout(payload: AddSkillToWorkoutAction["payload"]): AddSkillToWorkoutAction {
    return {
        type: "AddSkillToWorkout",
        payload,
    }
}
