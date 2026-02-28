import {ApproachesStore} from "./ApproachesStore"
import {AppStateStore} from "./AppStateStore"
import {NetworkStore} from "./NetworkStore"
import {PortalStore} from "./PortalStore"
import {SkillsStore} from "./SkillsStore"
import {SyncStore} from "./SyncStore"
import {WeightsStore} from "./WeightsStore"
import {WelcomeStore} from "./WelcomeStore"
import {WorkoutsStore} from "./WorkoutsStore"

export class Stores {
  portalStore = new PortalStore()
  networkStore = new NetworkStore()
  welcomeStore = new WelcomeStore()
  approachesStore = new ApproachesStore()
  skillsStore = new SkillsStore()
  weightsStore = new WeightsStore()
  workoutsStore = new WorkoutsStore()
  appStateStore = new AppStateStore(this)
  syncStore = new SyncStore(this)

}
