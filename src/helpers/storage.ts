
import * as FileSystem from "expo-file-system"
import {memoize} from "lodash"

import {analytics} from "./analytics"

const prefix = __DEV__ ? "dev--" : ""

const folderPath = String(FileSystem.documentDirectory) + "storage/"

const generateFilePath = memoize(function (key: string): string {
  return folderPath + prefix + key
})

export const storage = {
  async getItem(key: string): Promise<string | undefined> {
    let res
    try {
      const filePath = generateFilePath(key)
      const file = await FileSystem.getInfoAsync(filePath)
      if (file.exists) {
        res = await FileSystem.readAsStringAsync(filePath)
      }
    }
    catch (e) {
      analytics.trackError(e)
    }
    return res
  },
  async setItem(key: string, value: string) {
    try {
      const filePath = generateFilePath(key)
      const file = await FileSystem.getInfoAsync(filePath)
      if (file.exists) {
        await FileSystem.writeAsStringAsync(filePath, value)
      }
      else {
        await FileSystem.makeDirectoryAsync(folderPath, {intermediates: true})
        await FileSystem.writeAsStringAsync(filePath, value)
      }
    }
    catch (e) {
      analytics.trackError(e)
    }
  },
}
