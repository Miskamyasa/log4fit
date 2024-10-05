import {action, makeObservable, observable} from "mobx"

import {storage} from "../../helpers/storage"

export class WelcomeStore {
    constructor() {
        makeObservable(this)
        void this.init()
    }

    @observable public ready = false
    @action
    private setReady(bool: boolean): void {
        this.ready = bool
    }

    @observable public welcome = true
    @action
    public setWelcome(bool: boolean): void {
        this.welcome = bool
        void storage.setItem("welcome", bool ? "true" : "false")
    }

    private async init(): Promise<void> {
        try {
            const welcome = await storage.getItem("welcome")
            this.setWelcome(welcome === "true")
        }
        finally {
            this.setReady(true)
        }
    }
}
