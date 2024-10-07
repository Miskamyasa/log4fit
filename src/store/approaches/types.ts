import type {ResetAction} from "../common/types"
import type {Skill} from "../skills/types"
import type {Workout} from "../workouts/types"

export type WeightStep = 1 | 2 | 5 | 10

export type WeightSteps = Record<Skill["id"], WeightStep>

export type Approach = {
    id: string
    skillId: Skill["id"]
    workoutId: Workout["id"]
    weight: number
    repeats: number
}

export type ApproachesReducerState = {
    store: Record<Approach["id"], Approach>
    bySkill: Record<Skill["id"], Array<Approach["id"]>>
    byWorkout: Record<Workout["id"], Array<Approach["id"]>>
}

export type AddApproachAction = {
    type: "AddApproach"
    payload: Approach
}

export type ClearApproachesForWorkoutAction = {
    type: "ClearApproachesForWorkout"
    payload: Workout
}

export type LoadApproachesAction = {
    type: "LoadApproaches"
    payload: ApproachesReducerState
}

export type ApproachesReducerActions =
  | ResetAction
  | AddApproachAction
  | LoadApproachesAction
  | ClearApproachesForWorkoutAction
