import {createContext, useContext} from "react"

import {Stores} from "./Stores"

export let stores: Stores | null = null

export const StoresContext = createContext<Stores | null>(null)

export function createStores(): Stores {
    stores = stores || new Stores()
    return stores
}

// For use as hook in components
export function useStores(): Stores {
    const ctx = useContext(StoresContext)

    if (!ctx) {
        throw new Error("useStores must be used within a StoresProvider.")
    }

    return ctx
}
