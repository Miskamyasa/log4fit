import {action, makeObservable, observable} from "mobx"

import {storage} from "../../helpers/storage"

export class WelcomeStore {
    constructor() {
        makeObservable(this)
        void this.init()
    }

    private saveState(bool: boolean) {
        void storage.setItem("welcome", bool ? "true" : "false")
    }

    private async init() {
        const welcome = await storage.getItem("welcome")
        this.setWelcome(welcome === "true")
        this.setReady(true)
    }

    @observable public ready = false
    @action
    private setReady(bool: boolean) {
        this.ready = bool
    }

    @observable public welcome = true
    @action
    public setWelcome(bool: boolean) {
        this.welcome = bool
        this.saveState(bool)
    }
}
