import {Fragment, memo, ReactElement, RefObject} from "react"
import {ScrollView, StyleSheet, TextStyle, View, ViewStyle} from "react-native"

import {get, isEmpty, pick} from "lodash"


import ApproachCard from "../../components/ApproachCard"
import EmptyCard from "../../components/EmptyCard"
import PageTitle from "../../components/PageTitle"
import Span from "../../components/Span"
import layout from "../../constants/layout"
import {__locale, __t} from "../../i18"
import {useAppSelector} from "../../store"
import {Approach} from "../../store/approaches/types"
import {Skill} from "../../store/skills/types"

import AddApproachButton from "./AddApproachButton"
import AddSkillButton from "./AddSkillButton"


type _Props = {
  skillId: Skill["id"],
  scrollRef: RefObject<ScrollView>,
}

const container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: layout.gap,
}

const content: ViewStyle = {
  marginBottom: layout.gap,
}

const approaches: ViewStyle = {
  borderRadius: layout.gap,
  overflow: "hidden",
}

const sessionTitle: TextStyle = {
  fontSize: 16,
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap,
}

const staticStyles = StyleSheet.create({
  container,
  content,
  approaches,
  sessionTitle,
})

function CurrentApproaches({skillId, scrollRef}: _Props): ReactElement | null {
  const exercise = useAppSelector(state => state.skills.store[skillId])
  const approaches = useAppSelector(state => {
    const result: Approach[] = []
    const workoutId = state.workouts.current?.id
    if (workoutId) {
      const store = state.approaches.store
      const ids = state.approaches.byWorkout[workoutId]
      if (isEmpty(ids)) {
        return result
      }
      for (const id of ids) {
        const item = store[id]
        if (item.skillId === skillId) {
          result.push(item)
        }
      }
    }
    return result
  })

  const {weight, repeats}: Partial<Approach> = pick(
    get(approaches, [approaches?.length - 1], {}),
    ["weight", "repeats"]
  )

  return (
    <Fragment>

      <View style={staticStyles.content}>
        <Span style={staticStyles.sessionTitle}>{__t("workouts.sessionTitle")}</Span>
        <View style={staticStyles.approaches}>
          {!isEmpty(approaches) ? approaches.map((item) =>(
            <ApproachCard
              flex
              key={item.id}
              id={item.id} />
          )) : (
            <EmptyCard />
          )}
        </View>
      </View>

      <View style={staticStyles.container}>
        <AddSkillButton scrollRef={scrollRef} />
        <AddApproachButton
          skillId={skillId}
          lastRepeats={repeats}
          lastWeight={weight} />
      </View>

      <PageTitle
        icon={exercise?.icon}
        title={exercise.title[__locale()]} />

    </Fragment>
  )
}

export default memo(CurrentApproaches)
