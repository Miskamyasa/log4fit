import {takeLeading} from "@redux-saga/core/effects"
import Purchases, {PurchasesOfferings} from "react-native-purchases"
import {call, put} from "redux-saga/effects"

// import ErrorHandler from "../../helpers/ErrorHandler"
import {SagaGenerator} from "../types"

import {failFetchOffering, loadOffering} from "./actions"
import {LoadOfferingAction} from "./types"


export function* watchFetchOffering(): SagaGenerator {
  yield takeLeading("FetchOffering", function* fetchOffering() {
    try {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const {current}: PurchasesOfferings = yield call(Purchases.getOfferings)

      // TODO: remove this
      //console.log({current})

      if (current !== null && current.availablePackages?.length !== 0) {
        const payload: LoadOfferingAction["payload"] = {
          currentOffering: current.availablePackages,
        }


        yield put(loadOffering(payload))
      }

    } catch (error) {
      // FIXME: Add logic to handle fail offerings
      // ErrorHandler(error)
      yield put(failFetchOffering())
    }
  })
}
