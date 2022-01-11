import {v4 as uuidv4} from "uuid";

import ErrorHandler from "../helpers/ErrorHandler";
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
    await db.setItem("custom", doc);
  } catch (e) {
    ErrorHandler(e);
  }
  return doc;
}

export async function saveCustomExercise(params: Omit<DB_CustomExercise, "id">): Promise<DB_CustomExercise> {
  const doc = {...params, id: uuidv4()};
  return _backendCreationLogic(doc);
}
