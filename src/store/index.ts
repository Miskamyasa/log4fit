import {createStore, applyMiddleware} from "redux";
import {persistStore, persistCombineReducers} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import commonReducer from "./common/reducer";
import Constants from "expo-constants";
import {ConfiguredStore} from "./types";

const {slug = ""} = Constants.manifest || {};

const reducers = {
  common: commonReducer,
};

const config = {
  key: `@ExpoApp::${slug}`,
  storage: AsyncStorage,
  blacklist: __DEV__ ? Object.keys(reducers) : [],
};

const reducer = persistCombineReducers(config, reducers);

function configureStore(): ConfiguredStore {
  const store = createStore(reducer, applyMiddleware(
    // TODO: implement middlewares (saga / rx)
  ));
  const persistor = persistStore(store);

  return {
    persistor,
    store,
  };
}

export const {persistor, store} = configureStore();
