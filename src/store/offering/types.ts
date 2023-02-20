import {PurchasesPackage} from "react-native-purchases"

import {ResetAction} from "../common/types"
import {Loadable} from "../types"


type _State = {
  currentOffering: PurchasesPackage[] | null,
}

export type OfferingState = Loadable<_State>

export type FetchOfferingAction = {
  type: "FetchOffering",
}

export type LoadOfferingAction = {
  type: "LoadOffering",
  payload: _State,
}

export type FailFetchOfferingAction = {
  type: "FailFetchOffering",
}

export type OfferingActions =
  | ResetAction
  | FetchOfferingAction
  | LoadOfferingAction
  | FailFetchOfferingAction
