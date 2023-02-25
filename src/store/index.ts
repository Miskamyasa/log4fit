import {composeWithDevTools} from "@redux-devtools/extension"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {createStore, applyMiddleware, Dispatch} from "redux"
import {persistStore, persistCombineReducers} from "redux-persist"
import sagaMiddlewareFactory from "redux-saga"

import ErrorHandler from "../helpers/ErrorHandler"
import storage from "../helpers/storage"

import rootReducer from "./rootReducer"
import rootSaga from "./rootSaga"
import {Actions, AppState, ConfiguredStore} from "./types"


const config = {
  key: "-store",
  storage,
  blacklist: __DEV__
    ? Object.keys(rootReducer)
    // ? []
    : [],
}

const reducer = persistCombineReducers(config, rootReducer)

function configureStore(): ConfiguredStore {
  const sagaMiddleware = sagaMiddlewareFactory({
    onError: ErrorHandler,
  })

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )

  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return {
    persistor,
    store,
  }
}

const {persistor, store} = configureStore()

export function useAppDispatch(): Dispatch<Actions> {
  return useDispatch<typeof store.dispatch>()
}

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export {persistor, store}
