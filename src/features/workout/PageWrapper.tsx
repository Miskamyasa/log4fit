import {memo, type ReactNode} from "react"
import {StyleSheet, View} from "react-native"

import {layout} from "../../constants/layout"

const staticStyles = StyleSheet.create({
    container: {
        width: layout.width,
    },
})

export const PageWrapper = memo(function PageWrapper(props: {
    children: ReactNode
}) {
    return (
        <View style={staticStyles.container}>
            {props.children}
        </View>
    )
})
