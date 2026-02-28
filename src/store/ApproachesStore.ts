import {action, makeObservable, observable} from "mobx"
import {z} from "zod"

import {EMPTY_ARRAY} from "../constants/common"
import {analytics} from "../helpers/analytics"
import {idGenerator} from "../helpers/idGenerator"
import {storage} from "../helpers/storage"

import type {Skill} from "./SkillsStore"
import type {Workout} from "./WorkoutsStore"

const approachSchema = z.object({
  id: z.string(),
  skillId: z.string(),
  workoutId: z.string(),
  weight: z.number(),
  repeats: z.number(),
})

const STORAGE_KEY = "approaches"
const storageSchema = z.array(approachSchema)
type Storage = z.infer<typeof storageSchema>

export type Approach = z.infer<typeof approachSchema>

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
  constructor() {
    makeObservable(this)
    void this.init()
  }

  @observable public ready = false
  @action
  private setReady(val: boolean): void {
    this.ready = val
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
    this.save()
  }

  private async init(): Promise<void> {
    try {
      const saved = await storage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = storageSchema.parse(JSON.parse(saved))
        for (const approach of parsed.sort()) {
          this.registry[approach.id] = approach
          this.addApproachToSkill(approach.skillId, approach.id)
          this.addApproachToWorkout(approach.workoutId, approach.id)
        }
      }
    }
    catch (e) {
      analytics.trackError(e)
    }
    finally {
      this.setReady(true)
    }
  }

  private save(): void {
    const payload: Storage = Object.values(this.registry)
    storage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }
}
