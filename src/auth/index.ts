import errorHandler from "../helpers/errorHandler"
import idGenerator from "../helpers/idGenerator"
import storage from "../helpers/storage"


export async function getUserId(): Promise<string | undefined> {
  try {
    let userId = await storage.getItem("userId")

    if (!userId) {
      userId = idGenerator()
      await storage.setItem("userId", userId)
    }

    return userId
  } catch (e) {
    errorHandler(e)
  }
}
