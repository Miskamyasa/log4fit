import {action, makeObservable, observable} from "mobx"

import {storage} from "../helpers/storage"

const STORAGE_KEY = "welcome"

export class WelcomeStore {
  constructor() {
    makeObservable(this)
    void this.init()
  }

  @observable public ready = false
  @action
  private setReady(bool: boolean): void {
    this.ready = bool
  }

  @observable public welcome = true
  @action
  public setWelcome(bool: boolean): void {
    this.welcome = bool
    storage.setItem(STORAGE_KEY, bool ? "true" : "false")
  }

  private async init(): Promise<void> {
    try {
      const welcome = await storage.getItem(STORAGE_KEY)
      this.setWelcome(welcome === "true")
    }
    finally {
      this.setReady(true)
    }
  }
}
