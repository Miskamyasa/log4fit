import {takeLeading} from "@redux-saga/core/effects"
import Purchases, {PurchasesOffering} from "react-native-purchases"
import {call, put} from "redux-saga/effects"

// import ErrorHandler from "../../helpers/ErrorHandler"
import {SagaGenerator} from "../types"

import {failFetchOffering, loadOffering} from "./actions"
import {LoadOfferingAction} from "./types"


export function* watchFetchOffering(): SagaGenerator {
  yield takeLeading("FetchOffering", function* fetchOffering() {
    try {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const currentOffering: PurchasesOffering = yield call(Purchases.getOfferings)

      const payload: LoadOfferingAction["payload"] = {
        currentOffering,
      }

      yield put(loadOffering(payload))
    } catch (error) {
      // FIXME: Add logic to handle multiple offerings
      // ErrorHandler(error)
      yield put(failFetchOffering())
    }
  })
}
