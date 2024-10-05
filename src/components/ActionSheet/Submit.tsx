import type {ReactElement} from "react"
import {StyleSheet} from "react-native"

import {primaryColors} from "../../colors/colors"
import {allButtons, controlHeight} from "../../features/workout/styles"
import {Div} from "../Div"
import {Span} from "../Span"

const styles = StyleSheet.create({
    root: {
        ...allButtons,
        alignItems: "center",
        height: controlHeight + 2,
        width: "100%",
    },
})

export function Submit({onPress, text}: {
    text: string
    onPress: () => void
}): ReactElement {
    return (
        <Div
            style={styles.root}
            theme={primaryColors.background}
            onPress={onPress}>
            <Span colorName="alwaysWhite">{text}</Span>
        </Div>
    )
}
