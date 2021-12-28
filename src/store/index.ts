import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStore, applyMiddleware, Dispatch} from "redux";
import {persistStore, persistCombineReducers} from "redux-persist";
import sagaMiddlewareFactory from "redux-saga";

import appJson from "../../app.json";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import {Actions, AppState, ConfiguredStore} from "./types";


const config = {
  key: __DEV__ ? "@ExpoApp::dev" : `@ExpoApp::${appJson.expo.slug}`,
  storage: AsyncStorage,
  blacklist: __DEV__ ? Object.keys(rootReducer) : [],
};

const reducer = persistCombineReducers(config, rootReducer);

function configureStore(): ConfiguredStore {
  const sagaMiddleware = sagaMiddlewareFactory();

  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return {
    persistor,
    store,
  };
}

const {persistor, store} = configureStore();

export function useAppDispatch(): Dispatch<Actions> {
  return useDispatch<typeof store.dispatch>();
}

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export {persistor, store};
