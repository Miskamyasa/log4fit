import {PurchasesPackage} from "react-native-purchases"

import {ResetAction} from "../common/types"


export type OfferingState = {
  loading: boolean,
  payed: boolean,
  currentOffering: PurchasesPackage | null,
}

export type FetchIsPayedAction = {
  type: "FetchIsPayed",
}

export type FetchOfferingAction = {
  type: "FetchOffering",
}

export type LoadOfferingAction = {
  type: "LoadOffering",
  payload: Omit<OfferingState, "loading">,
}

export type FailFetchOfferingAction = {
  type: "FailFetchOffering",
}

export type OfferingActions =
  | ResetAction
  | FetchIsPayedAction
  | FetchOfferingAction
  | LoadOfferingAction
  | FailFetchOfferingAction
