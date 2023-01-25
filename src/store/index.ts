import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {createStore, applyMiddleware, Dispatch} from "redux"
import {persistStore, persistCombineReducers} from "redux-persist"
import sagaMiddlewareFactory from "redux-saga"

import {storage} from "../storage"

import rootReducer from "./rootReducer"
import rootSaga from "./rootSaga"
import {Actions, AppState, ConfiguredStore} from "./types"


const config = {
  key: "-store",
  storage,
  blacklist: __DEV__
    // ? Object.keys(rootReducer)
    ? []
    : [
    // "workouts" - TODO 💰 💰 💰 💰 💰
    ],
}

const reducer = persistCombineReducers(config, rootReducer)

function configureStore(): ConfiguredStore {
  const sagaMiddleware = sagaMiddlewareFactory({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError(error: Error, errorInfo: {sagaStack: string}) {
      // TODO: report error to backend.
      // this is not a one-size-fits-all solution, you must write a try/catch block in every saga generator
    },
  })

  const store = createStore(reducer, applyMiddleware(sagaMiddleware))
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
