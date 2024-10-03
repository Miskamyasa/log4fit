import {memo, type PropsWithChildren} from "react"
import {View, ViewStyle} from "react-native"

import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"

const row: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: layout.gap * 1.6,
}

const staticStyles = createStaticStyles({
    row,
})

export const Row = memo(function Row({children}: PropsWithChildren) {
    return (
        <View style={staticStyles.row}>
            {children}
        </View>
    )
})
