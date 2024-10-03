import {AppState, type AppStateStatus} from "react-native"

import {action, makeObservable, observable} from "mobx"

export class AppStateStore {
    constructor() {
        makeObservable(this)
        AppState.addEventListener("change", (state) => {
            this.setState(state)
        })
    }

    @observable public state: AppStateStatus = AppState.currentState
    @action
    private setState(value: AppStateStatus) {
        this.state = value
    }
}
