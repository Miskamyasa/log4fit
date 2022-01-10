import {DB_Approach} from "../../db/Approaches";
import {ResetAction} from "../common/types";
import {Exercise} from "../exercises/types";
import {Loadable} from "../types";
import {Workout} from "../workouts/types";


export type Approach = DB_Approach;

type _State = {
  store: Record<Approach["id"], Approach>,
  byWorkout: Record<Workout["id"], Array<Approach["id"]>>,
  byExercise: Record<Exercise["id"], Array<Approach["id"]>>,
};

export type ApproachesReducerState = Loadable<_State>;

export type FetchApproachesAction = {
  type: "FetchApproaches",
  payload: Workout["id"],
};

export type LoadApproachesAction = {
  type: "LoadApproaches",
  payload: _State,
};

export type FailFetchApproachesAction = {
  type: "FailFetchApproaches",
};

export type ApproachesReducerActions =
  | ResetAction
  | FetchApproachesAction
  | LoadApproachesAction
  | FailFetchApproachesAction
;
