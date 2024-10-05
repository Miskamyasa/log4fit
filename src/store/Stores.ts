import {AppStateStore} from "./app-state/AppStateStore"
import {ApproachesStore} from "./approaches/ApproachesStore"
import {NetworkStateStore} from "./network-state/NetworkStateStore"
import {PortalStore} from "./portal/PortalStore"
import {SkillsStore} from "./skills/SkillsStore"
import {WeightsStore} from "./weights/WeightsStore"
import {WelcomeStore} from "./welcome/WelcomeStore"

export class Stores {
    appStateStore: AppStateStore
    portalStore: PortalStore
    networkStateStore: NetworkStateStore
    welcomeStore: WelcomeStore
    approachesStore: ApproachesStore
    skillsStore: SkillsStore
    weightsStore: WeightsStore

    constructor() {
        this.appStateStore = new AppStateStore()
        this.portalStore = new PortalStore()
        this.networkStateStore = new NetworkStateStore()
        this.welcomeStore = new WelcomeStore()
        this.approachesStore = new ApproachesStore()
        this.skillsStore = new SkillsStore()
        this.weightsStore = new WeightsStore()
    }
}
