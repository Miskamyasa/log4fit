import {action, makeObservable, observable} from "mobx"

import {idGenerator} from "../helpers/idGenerator"
import {navigation} from "../navigation/config"

import type {AppSaveSnapshot, Skill, Workout, WorkoutsSnapshot} from "./schemas"
import {workoutsSnapshotSchema} from "./schemas"
import type {Stores} from "./Stores"

export class WorkoutsStore {
  constructor(private stores: Stores) {
    makeObservable(this)
  }

  @observable public current?: Workout["id"]
  @action
  private setCurrent(id: Workout["id"]): void {
    this.current = id
  }

  @observable public registry: Record<string, Workout> = {}
  @action
  private registerWorkout(workout: Workout): void {
    this.registry[workout.id] = workout
  }

  @observable public ids: Workout["id"][] = []
  @action
  private setIds(ids: Workout["id"][]): void {
    this.ids = ids
  }

  public addWorkout(): void {
    const w = {
      id: idGenerator(),
      date: Date.now(),
      skills: [],
    }
    this.registerWorkout(w)
    this.setIds([w.id, ...this.ids.slice()])
    this.setCurrent(w.id)
    void this.stores.syncStore.save()
    navigation.navigate("CurrentWorkoutScreen", {date: w.date})
  }

  public startWorkout(id: Workout["id"]): void {
    this.setCurrent(id)
    void this.stores.syncStore.save()
    navigation.navigate("CurrentWorkoutScreen", {date: this.registry[id].date})
  }

  @action
  public addSkillToWorkout(skillId: Skill["id"]): void {
    if (!this.current) {
      throw new Error("No current workout to add skill to")
    }
    this.registry[this.current].skills.push(skillId)
    void this.stores.syncStore.save()
  }

  public getSnapshot(): WorkoutsSnapshot {
    return {
      array: Object.values(this.registry),
      current: this.current,
    }
  }

  public loadSnapshot(snapshot: AppSaveSnapshot): void {
    const validated = workoutsSnapshotSchema.parse(snapshot.workoutsStore)
    this.registry = {}
    const ids: string[] = []
    const sorted = [...validated.array].sort((a, b) => b.date - a.date)
    for (const w of sorted) {
      this.registry[w.id] = w
      ids.push(w.id)
    }
    this.ids = ids
    this.current = validated.current
  }

  public reset(): void {
    this.registry = {}
    this.ids = []
    this.current = undefined
  }
}
