import {memo, type ReactElement} from "react"

import {Div} from "../../components/Div"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__t} from "../../helpers/i18n"

import {ExerciseProgressionCard} from "./ExerciseProgressionCard"
import type {ExerciseStat} from "./useStatsData"

type ExerciseProgressionListProps = {
  exerciseStats: ExerciseStat[],
}

const staticStyles = createStaticStyles({
  sectionTitle: {
    marginVertical: layout.gap,
  },
})

export const ExerciseProgressionList = memo(function ExerciseProgressionList(
  props: ExerciseProgressionListProps,
): ReactElement {
  const {exerciseStats} = props

  return (
    <Div>
      <Span
        size={16}
        style={staticStyles.sectionTitle}
        weight="600">
        {__t("statsScreen.exerciseProgression")}
      </Span>
      {exerciseStats.map((stat): ReactElement => (
        <ExerciseProgressionCard
          key={stat.id}
          bestWeight={stat.bestWeight}
          latestWeight={stat.latestWeight}
          name={stat.name}
          sessions={stat.sessions}
          sets={stat.sets} />
      ))}
    </Div>
  )
})
