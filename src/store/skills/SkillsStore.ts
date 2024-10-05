import {uniq} from "lodash"
import {action, makeObservable, observable} from "mobx"

import {analytics} from "../../helpers/analytics"
import {storage} from "../../helpers/storage"
import json from "../../json/skills.json"

import {createCustomSkill} from "./helpers"
import type {Categories, Skill, Skills} from "./types"

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

    public registry: Map<string, Skill> = new Map()

    @observable public ids: Skills = {
        custom: [],
        other: [],
        base: [],
    }

    @action
    private setIds(group: Categories, ids: Skill["id"][]): void {
        this.ids = {
            ...this.ids,
            [group]: uniq([...this.ids[group], ...ids]),
        }
    }

    @observable public loading = false
    @action
    private setLoading(loading: boolean): void {
        this.loading = loading
    }

    private async init(): Promise<void> {
        const saved = await storage.getItem("skills")
        try {
            const parsed = (saved ? (JSON.parse(saved)) : json) as Skills
            if (Array.isArray(parsed)) {
                this.register(parsed)
            }
        }
        catch (e) {
            analytics.sendError(e)
        }
        finally {
            this.setReady(true)
        }
    }

    private register(items: Skill[]): void {
        const ids: Record<Categories, Array<Skill["id"]>> = {
            custom: [],
            other: [],
            base: [],
        }
        for (const item of items) {
            const {id, category} = item
            this.registry.set(id, item)
            ids[category].push(id)
        }
        for (const category of Object.keys(ids) as Categories[]) {
            this.setIds(category as Categories, ids[category])
        }
    }

    public addCustomSkill(title: string): void {
        const skill = createCustomSkill(title)
        this.registry.set(skill.id, skill)
        this.setIds("custom", [skill.id])
    }

    public fetch(): void {
        this.setLoading(true)
        try {
            // TODO: Fetch skills from API
        }
        catch (e) {
            analytics.sendError(e)
        }
        finally {
            this.setLoading(false)
        }
    }
}
