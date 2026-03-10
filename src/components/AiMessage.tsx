import type {TextStyle, ViewStyle} from "react-native"

import {observer} from "mobx-react"

import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"
import type {Skill} from "../store/schemas"
import {useStores} from "../store/useStores"

import {Div} from "./Div"
import {Span} from "./Span"

const staticStyles: {
  container: ViewStyle,
  fatigueContainer: ViewStyle,
  fatigueTitle: TextStyle,
  text: TextStyle,
  title: TextStyle,
} = createStaticStyles({
  container: {
    backgroundColor: "slategrey",
    marginBottom: layout.gap,
    padding: 20,
  },
  fatigueContainer: {
    marginTop: 8,
  },
  fatigueTitle: {
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.8,
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.8,
  },
})

export const AiMessage = observer(function AiMessage(props: {
  skillId: Skill["id"],
}): React.ReactElement | null {
  const {recommendationStore} = useStores()
  const {skillId} = props

  if (!(skillId in recommendationStore.recommendations)) {
    return null
  }

  const recommendation = recommendationStore.recommendations[skillId]

  return (
    <Div style={staticStyles.container}>
      <Span style={staticStyles.title}>{__t("recommendations.next")}</Span>
      <Span style={staticStyles.text}>
        {recommendation.nextPattern} • {recommendation.nextWeight} {__t("recommendations.kg")}
      </Span>
      {recommendation.fatigueAdjustment !== null ? (
        <Div style={staticStyles.fatigueContainer}>
          <Span style={staticStyles.fatigueTitle}>{__t("recommendations.fatigueAdjustment")}</Span>
          <Span style={staticStyles.text}>
            {recommendation.fatigueAdjustment.pattern}
            {" • "}
            {recommendation.fatigueAdjustment.weight}
            {" "}
            {__t("recommendations.kg")}
          </Span>
        </Div>
      ) : null}
    </Div>
  )
})
