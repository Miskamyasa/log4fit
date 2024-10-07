import {action, makeObservable, observable} from "mobx"

// const STORAGE_KEY = "workouts"

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

    private async init(): Promise<void> {
        try {
            // ...
            await Promise.resolve()
        }
        catch (e) {
            console.warn(e)
        }
        finally {
            this.setReady(true)
        }
    }
}
