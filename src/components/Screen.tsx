import {memo, type ReactNode, useMemo} from "react"
import {View} from "react-native"

import {useThemeColor} from "../colors/useThemeColor"
import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"

import {StatusBar} from "./StatusBar"

const staticStyles = createStaticStyles({
    root: {
        flex: 1,
        paddingTop: layout.statusBarHeight,
    },
})

export const Screen = memo(function Screen(props: {
    children: ReactNode,
}) {
    const backgroundColor = useThemeColor("screenBackground")

    const style = useMemo(() => {
        const styles = [staticStyles.root, {backgroundColor}]
        return styles
    }, [backgroundColor])

    return (
        <View style={style}>
            <StatusBar />
            {props.children}
        </View>
    )
})
