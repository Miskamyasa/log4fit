import type {Store} from "redux"
import type {PersistPartial} from "redux-persist/es/persistReducer"
import type {Persistor} from "redux-persist/es/types"
import type {ForkEffect} from "redux-saga/effects"

import type {ApproachesReducerActions, ApproachesReducerState} from "./approaches/types"
import type {CommonReducerActions, CommonReducerState} from "./common/types"
import type {WorkoutsReducerActions, WorkoutsReducerState} from "./workouts/types"

export type SagaGenerator = Generator<ForkEffect<never>, void>

export type Actions =
  | CommonReducerActions
  | WorkoutsReducerActions
  | ApproachesReducerActions

export type AppState = {
    common: CommonReducerState
    workouts: WorkoutsReducerState
    approaches: ApproachesReducerState
}

export type ConfiguredStore = {
    persistor: Persistor
    store: Store<AppState & PersistPartial, Actions>
}
