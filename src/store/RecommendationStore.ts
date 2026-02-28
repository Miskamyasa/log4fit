import {action, makeObservable, observable} from "mobx"

import type {Skill} from "./schemas"
import type {Stores} from "./Stores"

export class RecommendationStore {
  constructor(private stores: Stores) {
    makeObservable(this)
    this.subscribeToNetwork()
  }

  @observable public messages: Record<Skill["id"], string> = {}

  @action
  public setMessage(skillId: Skill["id"], message: string): void {
    this.messages[skillId] = message
  }

  // TODO: Subscribe to NetworkStore messages for AI recommendations
  private subscribeToNetwork(): void {
    void this.stores
  }
}
