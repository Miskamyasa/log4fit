import {AppStateStore} from "./app-state/AppStateStore"
import {ApproachesStore} from "./approaches/ApproachesStore"
import {NetworkStateStore} from "./network-state/NetworkStateStore"
import {PortalStore} from "./portal/PortalStore"
import {SkillsStore} from "./skills/SkillsStore"
import {WeightsStore} from "./weights/WeightsStore"
import {WelcomeStore} from "./welcome/WelcomeStore"
import {WorkoutsStore} from "./workouts/WorkoutsStore"

export class Stores {
  appStateStore: AppStateStore
  portalStore: PortalStore
  networkStateStore: NetworkStateStore
  welcomeStore: WelcomeStore
  approachesStore: ApproachesStore
  skillsStore: SkillsStore
  weightsStore: WeightsStore
  workoutsStore: WorkoutsStore

  constructor() {
    this.portalStore = new PortalStore()
    this.networkStateStore = new NetworkStateStore()
    this.welcomeStore = new WelcomeStore()
    this.approachesStore = new ApproachesStore()
    this.skillsStore = new SkillsStore()
    this.weightsStore = new WeightsStore()
    this.workoutsStore = new WorkoutsStore()
    this.appStateStore = new AppStateStore(this)
  }
}
