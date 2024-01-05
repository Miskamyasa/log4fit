import {Store} from "redux"
import {PersistPartial} from "redux-persist/es/persistReducer"
import {Persistor} from "redux-persist/es/types"
import {ForkEffect} from "redux-saga/effects"

import {ApproachesReducerActions, ApproachesReducerState} from "./approaches/types"
import {CommonReducerActions, CommonReducerState} from "./common/types"
import {SettingsReducerActions, SettingsReducerState} from "./settings/types"
import {SkillsReducerActions, SkillsReducerState} from "./skills/types"
import {WorkoutsReducerActions, WorkoutsReducerState} from "./workouts/types"


export type SagaGenerator = Generator<ForkEffect<never>, void>

export type Actions =
  | CommonReducerActions
  | WorkoutsReducerActions
  | SkillsReducerActions
  | ApproachesReducerActions
  | SettingsReducerActions


export type AppState = {
    common: CommonReducerState,
    workouts: WorkoutsReducerState,
    skills: SkillsReducerState,
    approaches: ApproachesReducerState,
    settings: SettingsReducerState,
}

export type ConfiguredStore = {
    persistor: Persistor,
    store: Store<AppState & PersistPartial, Actions>,
}
