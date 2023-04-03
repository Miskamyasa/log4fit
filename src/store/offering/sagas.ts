import {select, takeLeading} from "@redux-saga/core/effects"
import {call, put} from "redux-saga/effects"

import offering, {PurchasesPackage} from "../../helpers/offering"
import {SagaGenerator} from "../types"

import {failFetchOffering, loadOffering} from "./actions"
import {selectCurrentOffering, selectPayed} from "./selectors"
import {FetchIsPayedAction, LoadOfferingAction} from "./types"


export function* watchFetchIsPayed(): SagaGenerator {
    yield takeLeading<FetchIsPayedAction>("FetchIsPayed", function* fetchIsPayed() {
        try {
            const currentOffering: PurchasesPackage | null = yield select(selectCurrentOffering)
            const isPayed: boolean = yield call(offering.isPayed.bind(null))

            yield put(loadOffering({
                currentOffering,
                payed: isPayed,
            }))

        } catch (error) {
            yield put(failFetchOffering())
        }
    })
}


export function* watchFetchOfferings(): SagaGenerator {
    yield takeLeading<FetchIsPayedAction>("FetchOffering", function* fetchOffering() {
        try {
            const payed: boolean = yield select(selectPayed)

            const currentOffering: PurchasesPackage = yield call(offering.getOffering.bind(null))

            const payload: LoadOfferingAction["payload"] = {
                currentOffering,
                payed,
            }

            yield put(loadOffering(payload))

        } catch (error) {
            yield put(failFetchOffering())
        }
    })
}
