import type {PropsWithChildren, ReactElement} from "react"

import {StoresContext, createStores} from "./useStores"

export function StoresProvider(props: PropsWithChildren): ReactElement {
    const stores = createStores()

    return (
        <StoresContext.Provider value={stores}>
            {props.children}
        </StoresContext.Provider>
    )
}
