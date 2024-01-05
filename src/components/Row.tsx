import {ReactElement, ReactNode} from "react"
import {View, ViewStyle} from "react-native"

import layout from "../constants/layout"
import createStaticStyles from "../helpers/createStaticStyles"


interface Props {
    children: ReactNode
}

const row: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: layout.gap * 1.6,
}

const staticStyles = createStaticStyles({
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
