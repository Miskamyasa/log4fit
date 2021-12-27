import {pick} from "lodash";

import {Categories, Collections, ExercisesReducerState, ExercisesResponse} from "./types";


export function processResponse(list: ExercisesResponse, state: ExercisesReducerState)
  : Collections {
  const current = pick<ExercisesReducerState, Categories>(state, ["used", "base", "other"]);
  const res = list.reduce((acc, item) => {
    if (acc.used[item.id]) {
      acc.used[item.id] = item;
    } else {
      acc[item.category][item.id] = item;
    }
    return acc;
  }, current);

  return res;
}
