import {OfferingActions, OfferingState} from "./types"


export function resetOfferingState(): OfferingState {
    return {
        payed: false,
        loading: false,
        currentOffering: null,
    }
}

function offeringReducer(
    state = resetOfferingState(),
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
        case "FailFetchOffering":
        case "Reset":
            return resetOfferingState()
        default:
            return state
    }
}

export default offeringReducer
