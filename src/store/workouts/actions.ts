import {AddSkillToWorkoutAction, AddWorkoutAction, LoadWorkoutsAction, StartWorkoutAction} from "./types"


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
