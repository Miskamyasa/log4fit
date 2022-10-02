import {Store} from "redux";
import {PersistPartial} from "redux-persist/es/persistReducer";
import {Persistor} from "redux-persist/es/types";
import {ForkEffect} from "redux-saga/effects";

import {ApproachesReducerActions, ApproachesReducerState} from "./approaches/types";
import {CommonReducerActions, CommonReducerState} from "./common/types";
import {CurrentWorkoutReducerActions, CurrentWorkoutReducerState} from "./currentWorkout/types";
import {ExercisesReducerActions, ExercisesReducerState} from "./exercises/types";
import {WorkoutsReducerActions, WorkoutsReducerState} from "./workouts/types";


export type Loadable<T> = T & {loading: boolean};

export type SagaGenerator = Generator<ForkEffect<never>, void>;

export type Actions =
  | CommonReducerActions
  | CurrentWorkoutReducerActions
  | WorkoutsReducerActions
  | ExercisesReducerActions
  | ApproachesReducerActions
;

export type ReducersState = {
  common: CommonReducerState,
  workouts: WorkoutsReducerState,
  exercises: ExercisesReducerState,
  approaches: ApproachesReducerState,
  currentWorkout: CurrentWorkoutReducerState,
};

export type AppState = ReducersState & PersistPartial;

export type ConfiguredStore = {
  persistor: Persistor,
  store: Store<ReducersState & PersistPartial, Actions>,
};
