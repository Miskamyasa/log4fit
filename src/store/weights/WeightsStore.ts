import {action, makeObservable, observable} from "mobx"
import {z} from "zod"

import {analytics} from "../../helpers/analytics"
import {storage} from "../../helpers/storage"

export const weights = z.enum(["1", "2", "5", "10"])
export type WeightSteps = z.infer<typeof weights>

const STORAGE_KEY = "weightSteps"
const schema = z.record(z.string(), weights)

type Settings = z.infer<typeof schema>

export class WeightsStore {
    constructor() {
        makeObservable(this)
        void this.init()
    }

    @observable public ready = false
    @action
    private setReady(val: boolean): void {
        this.ready = val
    }

    @observable public settings: Record<string, WeightSteps> = {}
    @action
    public setSettings(settings: Settings): void {
        for (const [id, value] of Object.entries(settings)) {
            this.settings[id] = value
        }
        this.save()
    }

    private async init(): Promise<void> {
        try {
            const saved = await storage.getItem(STORAGE_KEY)
            if (saved) {
                const parsed = schema.parse(JSON.parse(saved))
                this.setSettings(parsed)
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
        const payload: Settings = this.settings
        storage.setItem(STORAGE_KEY, JSON.stringify(payload))
    }
}
