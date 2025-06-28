import {memo, type ReactNode} from "react"
import {View} from "react-native"

import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"

const staticStyles = createStaticStyles({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: layout.gap * 1.6,
    },
})

export const Row = memo(function Row(props: {
    children: ReactNode,
}) {
    return (
        <View style={staticStyles.row}>
            {props.children}
        </View>
    )
})
