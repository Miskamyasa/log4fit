import * as FileSystem from "expo-file-system"

import {analyticsEventSchema, type AnalyticsEvent} from "./types"

const prefix = __DEV__ ? "dev--" : ""
const folderPath = String(FileSystem.documentDirectory) + "storage/"
const bufferKey = "analytics_event_buffer"
const bufferFilePath = folderPath + prefix + bufferKey
const analyticsEventArraySchema = analyticsEventSchema.array()

const buffer: AnalyticsEvent[] = []

const clear = (): void => {
  buffer.length = 0
}

const restore = async (): Promise<void> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(bufferFilePath)

    if (!fileInfo.exists) {
      clear()
      return
    }

    const fileContent = await FileSystem.readAsStringAsync(bufferFilePath)
    const parsedFileContent: unknown = JSON.parse(fileContent)
    const parsedBuffer = analyticsEventArraySchema.safeParse(parsedFileContent)

    if (!parsedBuffer.success) {
      console.error("Failed to restore analytics buffer: invalid payload", parsedBuffer.error)
      clear()
      return
    }

    clear()
    buffer.push(...parsedBuffer.data)
  }
  catch (error) {
    console.error("Failed to restore analytics buffer", error)
    clear()
  }
}

const persist = async (): Promise<void> => {
  try {
    const folderInfo = await FileSystem.getInfoAsync(folderPath)

    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(folderPath, {intermediates: true})
    }

    await FileSystem.writeAsStringAsync(bufferFilePath, JSON.stringify(buffer))
  }
  catch (error) {
    console.error("Failed to persist analytics buffer", error)
  }
}

const append = (event: AnalyticsEvent): void => {
  buffer.push(event)
}

const peek = (maxCount: number): AnalyticsEvent[] => {
  if (maxCount <= 0) {
    return []
  }

  return buffer.slice(0, maxCount)
}

const remove = (count: number): void => {
  if (count <= 0) {
    return
  }

  buffer.splice(0, count)
}

const size = (): number => buffer.length

export {
  append,
  clear,
  peek,
  persist,
  remove,
  restore,
  size,
}
