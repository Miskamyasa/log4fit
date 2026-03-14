import {AnalyticsStore} from "./AnalyticsStore"
import {ApproachesStore} from "./ApproachesStore"
import {AppStateStore} from "./AppStateStore"
import {NetworkStore} from "./NetworkStore"
import {PortalStore} from "./PortalStore"
import {RecommendationStore} from "./RecommendationStore"
import {SkillsStore} from "./SkillsStore"
import {SyncStore} from "./SyncStore"
import {WeightsStore} from "./WeightsStore"
import {WelcomeStore} from "./WelcomeStore"
import {WorkoutsStore} from "./WorkoutsStore"

export class Stores {
  analyticsStore = new AnalyticsStore()
  portalStore = new PortalStore()
  networkStore = new NetworkStore()
  recommendationStore = new RecommendationStore(this)
  welcomeStore = new WelcomeStore()
  syncStore = new SyncStore(this)
  approachesStore = new ApproachesStore(this)
  skillsStore = new SkillsStore(this)
  weightsStore = new WeightsStore()
  workoutsStore = new WorkoutsStore(this)
  appStateStore = new AppStateStore(this)

  public async init(): Promise<void> {
    await this.analyticsStore.init()
    await this.syncStore.load()
    this.skillsStore.seed()
  }

  public resetForLogout(): void {
    this.approachesStore.reset()
    this.skillsStore.reset()
    this.workoutsStore.reset()
    this.weightsStore.reset()
    this.welcomeStore.reset()
    this.recommendationStore.reset()
    this.syncStore.resetForLogout()
    this.analyticsStore.setUserId(null)
    this.skillsStore.seed()
  }
}
