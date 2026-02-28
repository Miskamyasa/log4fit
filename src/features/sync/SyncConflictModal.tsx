import {dangerColors, secondaryColors} from "../../colors/colors"
import {Container} from "../../components/ActionSheet/Container"
import {Title} from "../../components/ActionSheet/Title"
import {Div} from "../../components/Div"
import {Row} from "../../components/Row"
import {Span} from "../../components/Span"
import {buttons} from "../../constants/defaultStyles"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__t} from "../../helpers/i18n"

type SyncConflictModalProps = {
  onUseLocal: () => void,
  onUseServer: () => void,
}

const styles = createStaticStyles({
  button: {
    ...buttons,
    flex: 1,
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
})

export function SyncConflictModal({onUseLocal, onUseServer}: SyncConflictModalProps): React.JSX.Element {
  return (
    <Container>
      <Title>
        {__t("sync.conflictTitle")}
      </Title>
      <Row>
        <Span style={styles.description}>
          {__t("sync.conflictDescription")}
        </Span>
      </Row>
      <Row gap={8}>
        <Div
          style={styles.button}
          theme={secondaryColors.background}
          onPress={onUseLocal}>
          <Span>{__t("sync.useLocal")}</Span>
        </Div>
        <Div
          style={styles.button}
          theme={dangerColors.background}
          onPress={onUseServer}>
          <Span colorName="alwaysWhite">{__t("sync.useServer")}</Span>
        </Div>
      </Row>
    </Container>
  )
}
