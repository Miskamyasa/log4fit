import {useCallback} from "react"

import {navigation, type ScreenName} from "./config"
import type {ScreensParamList} from "./types"

export function useNavigate<T extends ScreenName, P extends ScreensParamList[T]>(
    name: T,
    replace?: boolean,
): (params: P) => void {
    return useCallback((params: P) => {
        if (replace) {
            navigation.replace(name, params)
        }
        else {
            navigation.navigate(name, params)
        }
    }, [name, replace])
}
