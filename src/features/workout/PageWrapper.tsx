import {memo, ReactNode} from "react"
import {StyleSheet, View, ViewStyle} from "react-native"

import {layout} from "../../constants/layout"

const container: ViewStyle = {
    width: layout.width,
}

const staticStyles = StyleSheet.create({container})

export const PageWrapper = memo(function PageWrapper(props: {
    children: ReactNode
}) {
    return (
        <View style={staticStyles.container}>
            {props.children}
        </View>
    )
})
