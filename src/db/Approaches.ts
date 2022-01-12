import {v4 as uuidv4} from "uuid";

import ErrorHandler from "../helpers/ErrorHandler";
import {DB_Exercise} from "./Exercises";
import db from "./index";
import {DB_BaseItem} from "./types";
import {DB_Workout} from "./Workouts";


export interface DB_Approach extends DB_BaseItem {
  readonly exerciseId: DB_Exercise["id"];
  readonly workoutId: DB_Workout["id"];
  readonly warmup: boolean;
  readonly weight: number;
  readonly repeats: number;
}

type _Params = {
  workoutId: DB_Approach["workoutId"],
};

export async function getApproaches({workoutId}: _Params): Promise<DB_Approach[]> {
  let res: DB_Approach[] = [];
  try {
    // TODO append to api request userId
    //  const userId = await getUserId();
    res = await db.getCollection("approaches", {workoutId});
  } catch (e) {
    ErrorHandler(e);
  }
  return res;
}

// 🔥 TODO transfer this to backend 🔥
async function _backendCreationLogic(doc: DB_Approach): Promise<DB_Approach> {
  try {
    await db.setItem("approaches", doc, {workoutId: doc.workoutId});
  } catch (e) {
    ErrorHandler(e);
  }
  return doc;
}

export async function saveApproach(params: Omit<DB_Approach, "id">): Promise<DB_Approach> {
  const doc = {...params, id: uuidv4()};
  return _backendCreationLogic(doc);
}
