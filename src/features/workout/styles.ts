import {type ViewStyle} from "react-native"

import {buttons} from "../../constants/defaultStyles"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"

export const allButtons: ViewStyle = {
    ...buttons,
    height: 64,
    width: (layout.width - (layout.gap * 1.75)) / 2,
}

export const buttonsStyles = createStaticStyles({
    allButtons,
    text: {
        fontSize: 15,
        fontWeight: "600",
    },
})

export const borders: ViewStyle = {
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#929496",
}

export const controlHeight = 40
export const inputHeight = 82
export const inputStyles = createStaticStyles({
    input: {
        height: inputHeight,
        paddingVertical: layout.gap,
        paddingHorizontal: layout.gap,
        fontSize: 32,
        maxWidth: "100%",
        fontWeight: "900",
        textAlign: "left",
        ...borders,
    },
})
