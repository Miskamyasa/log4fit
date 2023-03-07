import {memo, ReactElement} from "react"

import {__t} from "../i18"

import Card from "./Card"
import Span from "./Span"


interface Props {
  text?: string
}

function EmptyCard({text = __t("emptyApproaches")}: Props): ReactElement {
  return (
    <Card>
      <Span
        lines={1}
        size={15}
        weight={"600"}>
        {text}
      </Span>
    </Card>
  )
}

export default memo(EmptyCard)
