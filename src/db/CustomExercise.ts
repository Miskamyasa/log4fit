import {v4 as uuidv4} from "uuid";

import db from "./index";
import {DB_BaseItem} from "./types";


export interface DB_CustomExercise extends DB_BaseItem {
  readonly title: string;
  readonly userId: string;
}

// 🔥 TODO transfer this to backend 🔥
async function _backendCreationLogic(doc: DB_CustomExercise): Promise<DB_CustomExercise> {
  try {
    const collection = await db.getCollection<DB_CustomExercise>("custom");
    const found = collection.find(item => item.title === doc.title);
    if (found) {
      return found;
    }
    void db.retry(() => db.setItem("custom", doc));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
  return doc;
}

export async function saveCustomExercise(params: Omit<DB_CustomExercise, "id">): Promise<DB_CustomExercise> {
  return _backendCreationLogic({...params, id: uuidv4()});
}
