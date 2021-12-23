import {Action, Reducer, Store} from "redux";
import {PersistPartial} from "redux-persist/es/persistReducer";
import {Persistor} from "redux-persist/es/types";
import {CommonReducerActions, CommonReducerState} from "./common/types";


export type Actions = Action<
  | CommonReducerActions
>;

export type Reducers = {
  common: CommonReducerState,
};

export type RootReducer = Reducer<Reducers & PersistPartial, Actions>;

export type ConfiguredStore = {
  persistor: Persistor, store: Store<Reducers & PersistPartial, Actions>,
};

export type AppState = ReturnType<RootReducer>;
