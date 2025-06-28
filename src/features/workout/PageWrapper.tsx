import {memo, type ReactNode} from "react"
import {View} from "react-native"

import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"

const staticStyles = createStaticStyles({
    container: {
        width: layout.width,
    },
})

export const PageWrapper = memo(function PageWrapper(props: {
    children: ReactNode,
}) {
    return (
        <View style={staticStyles.container}>
            {props.children}
        </View>
    )
})
