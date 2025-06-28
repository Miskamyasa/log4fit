import {action, makeObservable, observable} from "mobx"
import {z} from "zod"

import {analytics} from "../../helpers/analytics"
import {idGenerator} from "../../helpers/idGenerator"
import {storage} from "../../helpers/storage"
import {navigation} from "../../navigation/config"
import type {Skill} from "../skills/SkillsStore"

const workoutSchema = z.object({
    id: z.string(),
    date: z.number(),
    skills: z.array(z.string()),
})
export type Workout = z.infer<typeof workoutSchema>

const STORAGE_KEY = "workouts"
const storageSchema = z.object({
    array: z.array(workoutSchema),
    current: workoutSchema.shape.id.optional(),
})
type Storage = z.infer<typeof storageSchema>

export class WorkoutsStore {
    constructor() {
        makeObservable(this)
        void this.init()
    }

    @observable public ready = false
    @action
    private setReady(val: boolean): void {
        this.ready = val
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
        this.save()
        navigation.navigate("CurrentWorkoutScreen", {date: w.date})
    }

    public startWorkout(id: Workout["id"]): void {
        this.setCurrent(id)
        this.save()
        navigation.navigate("CurrentWorkoutScreen", {date: this.registry[id].date})
    }

    @action
    public addSkillToWorkout(skillId: Skill["id"]): void {
        this.registry[this.current!].skills.push(skillId)
        this.save()
    }

    private async init(): Promise<void> {
        try {
            const saved = await storage.getItem(STORAGE_KEY)
            if (saved) {
                const parsed = storageSchema.parse(JSON.parse(saved))
                const ids: Workout["id"][] = []
                const sorted = parsed.array.sort((a, b) => a.date - b.date).reverse()
                for (const w of sorted) {
                    this.registry[w.id] = w
                    ids.push(w.id)
                }
                this.setIds(ids)
                if (parsed.current) {
                    this.setCurrent(parsed.current)
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
        const payload: Storage = {
            array: Object.values(this.registry),
            current: this.current,
        }
        storage.setItem(STORAGE_KEY, JSON.stringify(payload))
    }
}
