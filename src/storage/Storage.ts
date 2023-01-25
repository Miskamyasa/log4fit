import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

import appJson from "../../app.json"


class Storage  {
  private storage = ExpoFileSystemStorage
  prefix = __DEV__ ? "Log4Fit--dev--" : `Log4Fit--${appJson.expo.slug}--`

  constructor() {
    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  async getItem(key: string): Promise<string | undefined> {
    try {
      const data = await this.storage.getItem(this.prefix + key)
      // ...
      return data
    } catch (e) {
      // ... ???
    }
  }

  async setItem(key: string, data: string): Promise<undefined> {
    try {
      await this.storage.setItem(this.prefix + key, data)
      // ...
      return
    } catch (e) {
      // ... ???
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await this.storage.removeItem(this.prefix + key)
      return
    } catch (e) {
      // ... ???
    }
  }
}

export default Storage
