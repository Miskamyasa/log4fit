import FilesystemStorage from "redux-persist-filesystem-storage"

import appJson from "../../app.json"
import ErrorHandler from "../helpers/ErrorHandler"


class Storage  {
  private storage = FilesystemStorage
  prefix = __DEV__ ? "Log4Fit--dev--" : `Log4Fit--${appJson.expo.slug}--`

  constructor() {
    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  async getItem(key: string): Promise<string | undefined> {
    try {
      const data = await this.storage.getItem(this.prefix + key)
      // ... maybe some type of logging
      return data
    } catch (e) {
      ErrorHandler(e)
    }
  }

  async setItem(key: string, data: string): Promise<undefined> {
    try {
      await this.storage.setItem(this.prefix + key, data)
      // ... maybe some type of logging
      return
    } catch (e) {
      ErrorHandler(e)
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.storage.removeItem(this.prefix + key)
      // ... maybe some type of logging
      return
    } catch (e) {
      ErrorHandler(e)
    }
  }
}

const storage = new Storage()

export default storage
