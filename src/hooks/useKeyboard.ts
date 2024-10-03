import {useCallback, useEffect, useState} from "react"
import {Keyboard, Platform} from "react-native"

const showEvent = Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow"
const hideEvent = Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide"

type ReturnObject = [
    boolean,
    () => void,
    () => false,
]

export function useKeyboard(): ReturnObject {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const showListener = Keyboard.addListener(showEvent, () => {
            setVisible(true)
            return true
        })
        const hideListener = Keyboard.addListener(hideEvent, () => {
            setVisible(false)
            return true
        })
        return (): void => {
            showListener.remove()
            hideListener.remove()
        }
    }, [])

    const dismiss = useCallback(() => {
        Keyboard.dismiss()
    }, [])

    const handleUnhandledTouches = useCallback(() => {
        dismiss()
        return false
    }, [dismiss])

    return [visible, dismiss, handleUnhandledTouches]
}
