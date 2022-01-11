import {v4 as uuidv4} from "uuid";

import ErrorHandler from "../helpers/ErrorHandler";
import {DB_Exercise} from "./Exercises";
import db from "./index";
import {DB_BaseItem} from "./types";


export interface DB_Workout extends DB_BaseItem {
  readonly date: ReturnType<typeof Date.now>;
  readonly exercises: Array<DB_Exercise["id"]>;
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

export async function saveWorkout(params: Omit<DB_Workout, "id">): Promise<DB_Workout> {
  const doc = {...params, id: uuidv4()};
  try {
    await db.setItem("custom", doc);
  } catch (e) {
    ErrorHandler(e);
  }
  return doc;
}
