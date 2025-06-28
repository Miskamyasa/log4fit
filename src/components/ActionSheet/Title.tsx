import {Fragment, type ReactElement} from "react"
import {TouchableOpacity, type TextStyle} from "react-native"

import MaterialIcons from "@expo/vector-icons/MaterialIcons"

import type {ThemeProps} from "../../colors/types"
import {useThemeColor} from "../../colors/useThemeColor"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {Divider} from "../Divider"
import {Row} from "../Row"
import {Span} from "../Span"

const staticStyles: {
    text: TextStyle
} = createStaticStyles({
    text: {
        fontSize: 16,
    },
})

export const colors: Record<"divider", ThemeProps> = {
    divider: {
        light: "#e3e4e7",
        dark: "rgba(58,62,70,0.77)",
    },
}

export function Title({children, onClosePress}: {
    children: string
    onClosePress?: () => void
}): ReactElement {
    const textColor = useThemeColor("text")
    const dividerColor = useThemeColor("text", colors.divider)

    return (
        <Fragment>
            <Row>
                <Span style={staticStyles.text}>{children}</Span>
                {onClosePress && (
                    <TouchableOpacity
                        hitSlop={layout.hitSlop}
                        onPress={onClosePress}>
                        <MaterialIcons
                            color={textColor}
                            name="close"
                            size={20} />
                    </TouchableOpacity>
                )}
            </Row>
            <Row>
                <Divider color={dividerColor} />
            </Row>
        </Fragment>
    )
}
