import {ResetAction} from "../common/types"
import {Skill} from "../skills/types"
import {Workout} from "../workouts/types"


export type Approach = {
  id: string,
  skillId: Skill["id"],
  workoutId: Workout["id"],
  weight: number,
  repeats: number,
}

export type ApproachesReducerState = {
  store: Record<Approach["id"], Approach>,
  bySkill: Record<Skill["id"], Array<Approach["id"]>>,
  byWorkout: Record<Workout["id"], Array<Approach["id"]>>,
}

export type AddApproachAction = {
  type: "AddApproach",
  payload: Approach,
}

export type ClearApproachesForWorkoutAction = {
  type: "ClearApproachesForWorkout",
  payload: Workout,
}

export type LoadApproachesAction = {
  type: "LoadApproaches",
  payload: ApproachesReducerState,
}

export type ApproachesReducerActions =
  | ResetAction
  | AddApproachAction
  | LoadApproachesAction
  | ClearApproachesForWorkoutAction
