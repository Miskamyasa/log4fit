import {memo} from "react"

import {__t} from "../helpers/i18n"

import {Card} from "./Card"
import {Span} from "./Span"

export const EmptyCard = memo(function EmptyCard(props: {
    text?: string
}) {
    const {text = __t("emptyApproaches")} = props
    return (
        <Card>
            <Span
                lines={1}
                size={15}
                weight="600">
                {text}
            </Span>
        </Card>
    )
})
