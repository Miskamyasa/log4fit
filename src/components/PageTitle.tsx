import type {ReactElement} from "react"
import {TextStyle, ViewStyle} from "react-native"

import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"

import {Div} from "./Div"
import SkillImage from "./SkillImage"
import {Span} from "./Span"

const container: ViewStyle = {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: layout.gap / 2,
    overflow: "hidden",
    flexDirection: "row",
}

const text: TextStyle = {
    fontSize: 15,
}

const styles = createStaticStyles({
    container,
    text,
})

export function PageTitle({title, icon}: {
    title: string
    icon?: string
}): ReactElement {
    return (
        <Div style={styles.container}>
            {icon && (
                <SkillImage name={icon} />
            )}
            <Span style={styles.text}>{title}</Span>
        </Div>
    )
}
