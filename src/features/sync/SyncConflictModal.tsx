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
  onOverride: () => void,
  onSkip: () => void,
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

export function SyncConflictModal({onOverride, onSkip}: SyncConflictModalProps): React.JSX.Element {
  return (
    <Container>
      <Title onClosePress={onSkip}>
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
          theme={dangerColors.background}
          onPress={onOverride}>
          <Span colorName="alwaysWhite">{__t("sync.override")}</Span>
        </Div>
        <Div
          style={styles.button}
          theme={secondaryColors.background}
          onPress={onSkip}>
          <Span>{__t("skip")}</Span>
        </Div>
      </Row>
    </Container>
  )
}
