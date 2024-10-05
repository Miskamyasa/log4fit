import {action, makeObservable, observable} from "mobx"

import {storage} from "../../helpers/storage"

import type {WeightSettings} from "./types"

const STORAGE_KEY = "weightSteps"

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

    @observable public settings: WeightSettings = {}
    @action
    public saveSettings(val: WeightSettings): void {
        this.settings = {
            ...this.settings,
            ...val,
        }
        void storage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
    }

    private async init(): Promise<void> {
        try {
            const json = await storage.getItem(STORAGE_KEY)
            const saved = (json ? JSON.parse(json) : {}) as WeightSettings
            if (saved) {
                this.saveSettings(saved)
            }
        }
        catch (e) {
            console.warn(e)
        }
        finally {
            this.setReady(true)
        }
    }
}
