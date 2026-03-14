import {observer} from "mobx-react"

import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"
import type {Skill} from "../store/schemas"
import {useStores} from "../store/useStores"

import {Div} from "./Div"
import {Span} from "./Span"

const staticStyles = createStaticStyles({
  container: {
    marginBottom: layout.gap,
    padding: layout.gap,
    borderRadius: 6,
  },
  fatigueContainer: {
    marginTop: layout.gap,
  },
  fatigueTitle: {
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
  },
})

export const Recommendation = observer(function Recommendation(props: {
  skillId: Skill["id"],
}): React.ReactElement | null {
  const {skillId} = props

  const {recommendationStore} = useStores()

  // eslint-disable-next-line
  console.log(JSON.stringify(
    {recs: recommendationStore.recommendations, skillId}
    , null, 2))

  // if (!(skillId in recommendationStore.recommendations)) {
  //   return null
  // }

  const recommendation = recommendationStore.recommendations[skillId] ?? {}

  return (
    <Div style={staticStyles.container}>
      <Span style={staticStyles.title}>{__t("recommendations.next")}</Span>
      <Span
        size={20}
        weight="900">
        {recommendation.nextPattern}
        {" • "}
        {recommendation.nextWeight}
      </Span>
      {recommendation.fatigueAdjustment ? (
        <Div style={staticStyles.fatigueContainer}>
          <Span style={staticStyles.fatigueTitle}>{__t("recommendations.fatigueAdjustment")}</Span>
          <Span
            size={20}
            weight="900">
            {recommendation.fatigueAdjustment.pattern}
            {" • "}
            {recommendation.fatigueAdjustment.weight}
          </Span>
        </Div>
      ) : null}
    </Div>
  )
})
