import {ReactElement, ReactNode} from "react"
import {StyleSheet, View, ViewStyle} from "react-native"

import layout from "../constants/layout"


interface Props {
    children: ReactNode
}

const row: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: layout.gap * 1.6,
}

const staticStyles = StyleSheet.create({
    row,
})

function Row({children}: Props): ReactElement {
    return (
        <View style={staticStyles.row}>
            {children}
        </View>
    )
}

export default Row
