import * as FileSystem from "expo-file-system"
import {memoize} from "lodash"

import errorHandler from "../helpers/ErrorHandler"


const prefix = __DEV__ ? "dev--" : ""

const folderPath = String(FileSystem.documentDirectory) + "storage/"

const generateFilePath = memoize(function (key: string): string {
  return folderPath + prefix + key
})


class Storage {
  constructor() {
    this.getItem = this.getItem.bind(this)
    this.setItem = this.setItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  async getItem(key: string): Promise<string | undefined> {
    try {
      const info = await FileSystem.getInfoAsync(folderPath)
      if (info.exists) {
        return await FileSystem.readAsStringAsync(generateFilePath(key))
      }
    } catch (e) {
      errorHandler(e)
    }
  }

  async setItem(key: string, value: string): Promise<undefined> {
    try {
      const info = await FileSystem.getInfoAsync(folderPath)
      const filePath = generateFilePath(key)
      if (info.exists) {
        await FileSystem.writeAsStringAsync(filePath, value)
      } else {
        await FileSystem.makeDirectoryAsync(folderPath, {intermediates: true})
        await FileSystem.writeAsStringAsync(filePath, value)
      }
      return
    } catch (e) {
      errorHandler(e)
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      return await FileSystem.deleteAsync(generateFilePath(key), {idempotent: true})
    } catch (e) {
      errorHandler(e)
    }
  }
}

const storage = new Storage()

export default storage
