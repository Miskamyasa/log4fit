import {useEffect} from "react"

import {observer} from "mobx-react"

import {useStores} from "../../store/useStores"

export const Errors = observer(function Errors() {
    const {portalStore} = useStores()

    useEffect(() => {
        // ...
    }, [portalStore])

    return null
})
