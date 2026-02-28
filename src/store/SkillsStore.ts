import {action, makeObservable, observable} from "mobx"
import {z} from "zod"

import {analytics} from "../helpers/analytics"
import {__create} from "../helpers/i18n"
import {idGenerator} from "../helpers/idGenerator"
import json from "../json/skills.json"

import type {AppSaveSnapshot, Categories, Skill, SkillsSnapshot} from "./schemas"
import {skillSchema, skillsSnapshotSchema} from "./schemas"
import type {Stores} from "./Stores"

function createCustomSkill(title: string): Skill {
  return {
    id: idGenerator(),
    title: __create(title),
    category: "custom",
    description: __create(""),
    image: "",
  }
}

export class SkillsStore {
  constructor(private stores: Stores) {
    makeObservable(this)
  }

  public registry: Record<string, Skill> = {}

  @observable base: string[] = []
  @observable other: string[] = []
  @observable custom: string[] = []

  @action
  public addCustomSkill(title: string): void {
    const s = createCustomSkill(title)
    this.registry[s.id] = s
    this.custom.push(s.id)
    void this.stores.syncStore.save()
  }

  @observable public loading = false
  @action
  private setLoading(loading: boolean): void {
    this.loading = loading
  }

  @action
  public seed(): void {
    if (Object.keys(this.registry).length > 0) {
      return
    }
    const skills = z.array(skillSchema).parse(json)
    const ids: Record<Categories, string[]> = {custom: [], other: [], base: []}
    for (const skill of skills) {
      this.registry[skill.id] = skill
      ids[skill.category].push(skill.id)
    }
    this.custom = ids.custom
    this.other = ids.other
    this.base = ids.base
    void this.stores.syncStore.save()
  }

  public getSnapshot(): SkillsSnapshot {
    return Object.values(this.registry)
  }

  public loadSnapshot(snapshot: AppSaveSnapshot): void {
    const validated = skillsSnapshotSchema.parse(snapshot.skillsStore)
    this.registry = {}
    const ids: Record<Categories, string[]> = {custom: [], other: [], base: []}
    for (const skill of validated) {
      this.registry[skill.id] = skill as Skill
      ids[skill.category].push(skill.id)
    }
    this.custom = ids.custom
    this.other = ids.other
    this.base = ids.base
  }

  public reset(): void {
    this.registry = {}
    this.custom = []
    this.other = []
    this.base = []
  }

  public fetch(): void {
    this.setLoading(true)
    try {
      // TODO: Fetch skills from API
    }
    catch (e) {
      analytics.trackError(e)
    }
    finally {
      this.setLoading(false)
    }
  }
}
