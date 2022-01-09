import {v4 as uuidv4} from "uuid";

import {storage} from "../storage";


export async function getUserId(): Promise<string | undefined> {
  try {
    let userId = await storage.getItem("userId");

    if (!userId) {
      userId = uuidv4();
      await storage.setItem("userId", userId);
    }

    return userId;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
}
