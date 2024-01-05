import {memo, ReactElement, ReactNode, useMemo} from "react"
import {StyleSheet, View, ViewStyle} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"
import layout from "../constants/layout"

import StatusBar from "./StatusBar"


interface Props {
    children: ReactNode
    unsafe?: boolean
}

const root: ViewStyle = {
    flex: 1,
    paddingTop: layout.statusBarHeight,
}

const staticStyles = StyleSheet.create({root})

function Screen({children}: Props): ReactElement {
    const backgroundColor = useThemeColor("screenBackground")

    const style = useMemo(() => {
        const styles = [staticStyles.root, {backgroundColor}]
        return styles
    }, [backgroundColor])

    return (
        <View style={style}>
            <StatusBar />
            {children}
        </View>
    )
}

export default memo(Screen)
