import {useCallback, useState} from "react"

type ReturnObject = [boolean, () => void, () => void]

export function useBoolean(
  initialState = false,
  callbackOnTrue?: () => void,
  callbackOnFalse?: () => void,
): ReturnObject {
  const [bool, setBool] = useState(initialState)

  const setTrue = useCallback(() => {
    setBool(true)
    if (callbackOnTrue) {
      callbackOnTrue()
    }
  }, [callbackOnTrue])

  const setFalse = useCallback(() => {
    setBool(false)
    if (callbackOnFalse) {
      callbackOnFalse()
    }
  }, [callbackOnFalse])

  return [bool, setTrue, setFalse]
}
