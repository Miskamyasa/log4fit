import {OfferingState, OfferingActions} from "./types"


export function resetOfferingState(): OfferingState {
  return {
    loading: false,
    currentOffering: null,
  }
}

const initialState = resetOfferingState()


function offeringReducer(
  state: OfferingState = initialState,
  action: OfferingActions): OfferingState {
  switch (action.type) {
    case "FetchOffering": {
      return {
        ...state,
        loading: true,
      }
    }
    case "LoadOffering": {
      return {
        ...action.payload,
        loading: false,
      }
    }
    case "FailFetchOffering": {
      return {
        ...state,
        loading: false,
      }
    }
    case "Reset":
      return resetOfferingState()
    default:
      return state
  }
}

export default offeringReducer
