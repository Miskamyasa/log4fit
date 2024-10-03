import type {PropsWithChildren} from "react"

import {StoresContext, createStores} from "./useStores"

export function StoresProvider(props: PropsWithChildren) {
    const stores = createStores()

    return (
        <StoresContext.Provider value={stores}>
            {props.children}
        </StoresContext.Provider>
    )
}
