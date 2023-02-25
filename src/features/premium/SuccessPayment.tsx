import React, {ReactElement} from "react"

import Container from "../../components/ActionSheet/Container"
import Submit from "../../components/ActionSheet/Submit"
import Title from "../../components/ActionSheet/Title"
import Row from "../../components/Row"
import Span from "../../components/Span"
import {__t} from "../../i18"


interface _Props {
  dismiss: () => void
}

function SuccessPayment({dismiss}: _Props): ReactElement {
  return (
    <Container>
      <Title onClosePress={dismiss}>{__t("success")}</Title>
      <Row>
        <Span>{__t("premiumScreen.success")}</Span>
      </Row>
      <Submit
        text={__t("back")}
        onPress={dismiss} />
    </Container>
  )
}

export default SuccessPayment
