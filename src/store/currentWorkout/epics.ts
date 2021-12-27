import {Epic, ofType} from "redux-observable";
import {EMPTY, mergeMap} from "rxjs";

import {EpicState} from "../types";
import {StartCurrentWorkoutAction} from "./types";


type StartWorkoutEpic = Epic<StartCurrentWorkoutAction, StartCurrentWorkoutAction, EpicState>;

const startWorkoutEpic: StartWorkoutEpic = (action$, state$) => {
  return action$.pipe(
    ofType("START_WORKOUT"),
    mergeMap(() => {
      console.log("START_ME");
      return EMPTY;
    })
  );
};

export default startWorkoutEpic;
