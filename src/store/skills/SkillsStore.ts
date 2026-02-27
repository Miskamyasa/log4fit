import {action, makeObservable, observable} from "mobx"
import {z} from "zod"

import {IMAGES_KEYS} from "../../../assets/images"
import {analytics} from "../../helpers/analytics"
import {__create} from "../../helpers/i18n"
import {idGenerator} from "../../helpers/idGenerator"
import {storage} from "../../helpers/storage"
import json from "../../json/skills.json"

const categories = z.enum(["custom", "other", "base"])
export type Categories = z.infer<typeof categories>

const skillSchema = z.object({
  id: z.string(),
  category: categories,
  icon: z.enum(IMAGES_KEYS).optional(),
  title: z.record(z.string(), z.string()),
  description: z.record(z.string(), z.string()),
  image: z.string(),
})
export type Skill = z.infer<typeof skillSchema>

const STORAGE_KEY = "skills"
const storageSchema = z.array(skillSchema)
type Storage = z.infer<typeof storageSchema>

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
  constructor() {
    makeObservable(this)
    void this.init()
  }

  @observable public ready = false
  @action
  private setReady(val: boolean): void {
    this.ready = val
  }

  public registry: Record<string, Skill> = {}

  @observable base: string[] = []
  @observable other: string[] = []
  @observable custom: string[] = []

  @action
  private register(arr: Skill[]): void {
    const ids: Record<Categories, string[]> = {
      custom: [],
      other: [],
      base: [],
    }
    for (const el of arr.sort()) {
      const parsed = el
      this.registry[parsed.id] = parsed
      ids[parsed.category].push(parsed.id)
    }
    if (ids.custom.length) {
      this.custom = ids.custom
    }
    if (ids.other.length) {
      this.other = ids.other
    }
    if (ids.base.length) {
      this.base = ids.base
    }
    this.save()
  }

  @action
  public addCustomSkill(title: string): void {
    const s = createCustomSkill(title)
    this.registry[s.id] = s
    this.custom.push(s.id)
    this.save()
  }

  @observable public loading = false
  @action
  private setLoading(loading: boolean): void {
    this.loading = loading
  }

  private async init(): Promise<void> {
    try {
      const saved = await storage.getItem(STORAGE_KEY)
      if (!saved) {
        // First app run
        this.register(storageSchema.parse(json))
        return
      }
      this.register(storageSchema.parse(JSON.parse(saved)))
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
