import type {ReactElement} from "react"

import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"

import {Div} from "./Div"
import {Span} from "./Span"

const staticStyles = createStaticStyles({
    container: {
        backgroundColor: "slategrey",
        padding: 20,
        position: "absolute",
        top: layout.statusBarHeight + layout.headerHeight,
        width: layout.width,
        zIndex: 10,
    },
})

export function AiMessage(): ReactElement {
    return (
        <Div
            style={staticStyles.container}>
            <Span>Here an Ai message will be placed</Span>
        </Div>
    )
}
