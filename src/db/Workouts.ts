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
    // eslint-disable-next-line no-console
    console.warn(e);
  }
  return res;
}
