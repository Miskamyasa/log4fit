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
            const file = await FileSystem.getInfoAsync(folderPath)
            if (file.exists) {
                res = await FileSystem.readAsStringAsync(generateFilePath(key))
            }
        }
        catch (e) {
            analytics.sendError(e)
        }
        return res
    },
    async setItem(key: string, value: string): Promise<undefined> {
        try {
            const file = await FileSystem.getInfoAsync(folderPath)
            const filePath = generateFilePath(key)
            if (file.exists) {
                await FileSystem.writeAsStringAsync(filePath, value)
            }
            else {
                await FileSystem.makeDirectoryAsync(folderPath, {intermediates: true})
                await FileSystem.writeAsStringAsync(filePath, value)
            }
        }
        catch (e) {
            analytics.sendError(e)
        }
    },
    async removeItem(key: string): Promise<void> {
        try {
            return await FileSystem.deleteAsync(generateFilePath(key), {idempotent: true})
        }
        catch (e) {
            analytics.sendError(e)
        }
    },
}
