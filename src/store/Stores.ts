import {ApproachesStore} from "./ApproachesStore"
import {AppStateStore} from "./AppStateStore"
import {NetworkStateStore} from "./NetworkStateStore"
import {PortalStore} from "./PortalStore"
import {SkillsStore} from "./SkillsStore"
import {WeightsStore} from "./WeightsStore"
import {WelcomeStore} from "./WelcomeStore"
import {WorkoutsStore} from "./WorkoutsStore"

export class Stores {
  portalStore = new PortalStore()
  networkStateStore = new NetworkStateStore()
  welcomeStore = new WelcomeStore()
  approachesStore = new ApproachesStore()
  skillsStore = new SkillsStore()
  weightsStore = new WeightsStore()
  workoutsStore = new WorkoutsStore()
  appStateStore = new AppStateStore(this)
}
