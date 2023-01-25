import {Store} from "redux"
import {PersistPartial} from "redux-persist/es/persistReducer"
import {Persistor} from "redux-persist/es/types"
import {ForkEffect} from "redux-saga/effects"

import {ApproachesReducerActions, ApproachesReducerState} from "./approaches/types"
import {CommonReducerActions, CommonReducerState} from "./common/types"
import {SkillsReducerActions, SkillsReducerState} from "./skills/types"
import {WorkoutsReducerActions, WorkoutsReducerState} from "./workouts/types"


export type ID = string

export type Loadable<T> = T & {loading: boolean}

export type SagaGenerator = Generator<ForkEffect<never>, void>

export type Actions =
  | CommonReducerActions
  | WorkoutsReducerActions
  | SkillsReducerActions
  | ApproachesReducerActions


export type ReducersState = {
  common: CommonReducerState,
  workouts: WorkoutsReducerState,
  skills: SkillsReducerState,
  approaches: ApproachesReducerState,
}

export type AppState = ReducersState & PersistPartial

export type ConfiguredStore = {
  persistor: Persistor,
  store: Store<ReducersState & PersistPartial, Actions>,
}
