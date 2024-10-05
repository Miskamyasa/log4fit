import {composeWithDevTools} from "@redux-devtools/extension"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import {applyMiddleware, Dispatch, legacy_createStore as createStore} from "redux"
import {persistCombineReducers, persistStore} from "redux-persist"
import sagaMiddlewareFactory from "redux-saga"

import {analytics} from "../helpers/analytics"
import {storage} from "../helpers/storage"

import approachesReducer from "./approaches/reducer"
import commonReducer from "./common/reducer"
import rootSaga from "./rootSaga"
import {Actions, AppState, ConfiguredStore} from "./types"
import workoutsReducer from "./workouts/reducer"

const config = {
    key: "-store",
    storage,
}

const reducer = persistCombineReducers<AppState>(config, {
    common: commonReducer,
    workouts: workoutsReducer,
    approaches: approachesReducer,
})

function configureStore(): ConfiguredStore {
    const sagaMiddleware = sagaMiddlewareFactory({
        onError: err => analytics.sendError(err),
    })

    const store = createStore(
        reducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware)),
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
