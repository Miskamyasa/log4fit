import type {ReactNode} from "react"
import {InteractionManager} from "react-native"

import {action, makeObservable, observable} from "mobx"

import {timings} from "../../constants/timings"

export class PortalStore {
    constructor() {
        makeObservable(this)
    }

    @observable public visible = false
    @action
    private setVisible(bool: boolean) {
        this.visible = bool
    }

    public options: Record<string, unknown> = {
        id: null,
    }

    public component: ReactNode | null = null

    public open = (component: ReactNode, options?: typeof this.options) => {
        this.component = component
        this.setVisible(true)
        this.options = options ?? {}
    }

    public close = () => {
        this.setVisible(false)
        setTimeout(() => {
            void InteractionManager.runAfterInteractions(() => {
                this.component = null
            })
        }, timings.modal.close)
    }
}
