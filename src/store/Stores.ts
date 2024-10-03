import {AppStateStore} from "./app-state/AppStateStore"
import {NetworkStateStore} from "./network-state/NetworkStateStore"
import {PortalStore} from "./portal/PortalStore"
import {WelcomeStore} from "./welcome/WelcomeStore"

export class Stores {
    appStateStore: AppStateStore
    portalStore: PortalStore
    networkStateStore: NetworkStateStore
    welcomeStore: WelcomeStore

    constructor() {
        this.appStateStore = new AppStateStore()
        this.portalStore = new PortalStore()
        this.networkStateStore = new NetworkStateStore()
        this.welcomeStore = new WelcomeStore()
    }
}
