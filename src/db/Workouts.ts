import {v4 as uuidv4} from "uuid";

import ErrorHandler from "../helpers/ErrorHandler";
import {DB_Exercise} from "./Exercises";
import db from "./index";
import {DB_BaseItem} from "./types";


export interface DB_Workout extends DB_BaseItem {
  readonly date: ReturnType<typeof Date.now>;
  exercises: Array<DB_Exercise["id"]>;
}

export async function getWorkouts(): Promise<DB_Workout[]> {
  let res: DB_Workout[] = [];
  try {
    res = await db.getCollection("workouts");
  } catch (e) {
    ErrorHandler(e);
  }
  return res;
}

// 🔥 TODO transfer this to backend 🔥
async function _backendCreationLogic(doc: DB_Workout): Promise<DB_Workout> {
  try {
    const collection = await getWorkouts();
    const found = collection.find(item => item.id === doc.id);
    if (found) {
      doc = {...found, ...doc};
    }
    await db.setItem("workouts", doc);
  } catch (e) {
    ErrorHandler(e);
  }
  return doc;
}

interface _SaveParams extends Omit<DB_Workout, "id"> {
  id?: DB_BaseItem["id"];
}

export async function saveWorkout(params: _SaveParams): Promise<DB_Workout> {
  const doc = {...params, id: params.id || uuidv4()};
  return _backendCreationLogic(doc);
}
