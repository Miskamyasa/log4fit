import {ResetAction} from "../common/types"
import {Skill} from "../skills/types"


export type Workout = {
  id: string,
  date: ReturnType<typeof Date.now>,
  skills: Array<Skill["id"]>,
}

export type WorkoutsReducerState = {
  loading: boolean,
  store: Record<Workout["id"], Workout>,
  ids: Array<Workout["id"]>,
  current: Workout | null,
}

export type AddWorkoutAction = {
  type: "AddWorkout",
}

export type FailAddWorkoutAction = {
  type: "FailAddWorkout",
}

export type StartWorkoutAction = {
  type: "StartWorkout",
  payload: Workout["id"],
}

export type AddSkillToWorkoutAction = {
  type: "AddSkillToWorkout",
  payload: Skill["id"],
}

export type LoadWorkoutsAction = {
  type: "LoadWorkouts",
  payload: Omit<WorkoutsReducerState, "loading">,
}

export type WorkoutsReducerActions =
  | AddWorkoutAction
  | StartWorkoutAction
  | AddSkillToWorkoutAction
  | LoadWorkoutsAction
  | ResetAction
  | FailAddWorkoutAction
