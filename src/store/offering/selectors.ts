import {PurchasesPackage} from "../../helpers/offering"
import {AppState} from "../types"


export function selectOffering(state: AppState): AppState["offering"] {
  return state.offering
}

export function selectCurrentOffering(state: AppState): PurchasesPackage | null {
  return state.offering.currentOffering
}

export function selectPayed(state: AppState): boolean {
  return state.offering.payed
}

export function selectOfferingLoading(state: AppState): boolean {
  return state.offering.loading
}
