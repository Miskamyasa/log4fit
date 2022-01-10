import {Exercise} from "../store/exercises/types";
import {Workout} from "../store/workouts/types";
import db from "./index";
import {DB_BaseItem} from "./types";
import {DB_Workout} from "./Workouts";


export interface DB_Approach extends DB_BaseItem {
  readonly exerciseId: Exercise["id"];
  readonly workoutId: Workout["id"];
  readonly warmup: boolean;
  readonly weight: number;
  readonly repeats: number;
}

type _Params = {
  workoutId: DB_Workout["id"],
};

export async function getApproaches({workoutId}: _Params): Promise<DB_Approach[]> {
  let res: DB_Approach[] = [];
  try {
    // TODO append to api request userId
    //  const userId = await getUserId();
    res = await db.getCollection("approaches", {workoutId});
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
  return res;
}
