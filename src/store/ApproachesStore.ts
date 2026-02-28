import {action, makeObservable, observable} from "mobx"

import {EMPTY_ARRAY} from "../constants/common"
import {idGenerator} from "../helpers/idGenerator"

import type {AppSaveSnapshot, Approach, ApproachesSnapshot, Skill, Workout} from "./schemas"
import {approachesSnapshotSchema} from "./schemas"
import type {Stores} from "./Stores"

function createApproach(workoutId: Workout["id"], skillId: Skill["id"], weight: number, repeats: number): Approach {
  return {
    id: idGenerator(),
    workoutId,
    skillId,
    weight,
    repeats,
  }
}

export class ApproachesStore {
  constructor(private stores: Stores) {
    makeObservable(this)
  }

  public registry: Record<string, Approach> = {}

  @observable public idsByWorkout: Record<string, string[]> = {}
  @action
  private addApproachToWorkout(workoutId: Workout["id"], approachId: Approach["id"]): void {
    this.idsByWorkout[workoutId] = [...(this.idsByWorkout[workoutId] ?? EMPTY_ARRAY), approachId]
  }

  @observable public idsBySkill: Record<string, string[]> = {}
  @action
  private addApproachToSkill(skillId: Skill["id"], approachId: Approach["id"]): void {
    this.idsBySkill[skillId] = [...(this.idsBySkill[skillId] ?? EMPTY_ARRAY), approachId]
  }

  public addApproach(workoutId: Workout["id"], skillId: Skill["id"], weight: number, repeats: number): void {
    const approach = createApproach(workoutId, skillId, weight, repeats)
    this.registry[approach.id] = approach
    this.addApproachToWorkout(workoutId, approach.id)
    this.addApproachToSkill(skillId, approach.id)
    void this.stores.syncStore.save()
  }

  public getSnapshot(): ApproachesSnapshot {
    return Object.values(this.registry)
  }

  public loadSnapshot(snapshot: AppSaveSnapshot): void {
    const validated = approachesSnapshotSchema.parse(snapshot.approachesStore)
    this.registry = {}
    this.idsByWorkout = {}
    this.idsBySkill = {}
    for (const approach of validated) {
      this.registry[approach.id] = approach
      this.idsByWorkout[approach.workoutId] = [...(this.idsByWorkout[approach.workoutId] ?? []), approach.id]
      this.idsBySkill[approach.skillId] = [...(this.idsBySkill[approach.skillId] ?? []), approach.id]
    }
  }

  public reset(): void {
    this.registry = {}
    this.idsByWorkout = {}
    this.idsBySkill = {}
  }
}
