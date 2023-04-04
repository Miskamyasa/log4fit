import {
    FailFetchOfferingAction,
    FetchIsPayedAction,
    FetchOfferingAction,
    LoadOfferingAction,
} from "./types"


export function fetchIsPayed(): FetchIsPayedAction {
    return {
        type: "FetchIsPayed",
    }
}

export function fetchOffering(): FetchOfferingAction {
    return {
        type: "FetchOffering",
    }
}

export function loadOffering(payload: LoadOfferingAction["payload"]): LoadOfferingAction {
    return {
        type: "LoadOffering",
        payload,
    }
}

export function failFetchOffering(): FailFetchOfferingAction {
    return {
        type: "FailFetchOffering",
    }
}
