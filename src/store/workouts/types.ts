import {ResetAction} from "../common/types"
import {Skill} from "../skills/types"
import {ID, Loadable} from "../types"


export type Workout = {
  id: ID,
  date: ReturnType<typeof Date.now>,
  skills: Array<Skill["id"]>,
}

type _State = {
  store: Record<Workout["id"], Workout>,
  ids: Array<Workout["id"]>,
  current: Workout | null,
}

export type WorkoutsReducerState = Loadable<_State>

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
  payload: _State,
}

export type WorkoutsReducerActions =
  | AddWorkoutAction
  | StartWorkoutAction
  | AddSkillToWorkoutAction
  | LoadWorkoutsAction
  | ResetAction
  | FailAddWorkoutAction
