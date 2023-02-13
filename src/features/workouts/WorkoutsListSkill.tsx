import {memo, ReactElement, useCallback, useMemo} from "react"
import {
  ScrollView, StyleSheet, View, ViewStyle, TextStyle, NativeSyntheticEvent, NativeScrollEvent,
} from "react-native"

import {isEmpty} from "lodash"

import ApproachCard from "../../components/ApproachCard"
import SkillImage from "../../components/SkillImage"
import Span from "../../components/Span"
import layout from "../../constants/layout"
import analytics from "../../helpers/analytics"
import {__locale} from "../../i18"
import {useAppSelector} from "../../store"
import {Skill} from "../../store/skills/types"
import {Workout} from "../../store/workouts/types"


type _Props = {
  id: Skill["id"],
  workoutId: Workout["id"],
}

const container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  overflow: "hidden",
  paddingBottom: layout.gap,
}

const title: TextStyle = {
  fontSize: 13,
  lineHeight: 13,
  width: layout.skillTitleWidth,
  paddingRight: layout.gap / 2,
}

const content: ViewStyle = {
  height: 42,
  flex: 1,
  borderRadius: 8,
  overflow: "hidden",
  marginRight: layout.gap / 2,
}

const staticStyles = StyleSheet.create({container, title, content})

function WorkoutsListSkill({id, workoutId}: _Props): ReactElement | null {
  const skill = useAppSelector(state => state.skills.store[id])

  const store = useAppSelector(state => state.approaches.store)
  const ids = useAppSelector(state => state.approaches.byWorkout[workoutId])

  const content = useMemo(() => {
    if (isEmpty(ids)) {
      return []
    }
    const res = []
    for (const approachId of ids) {
      const curr = store[approachId]
      if (curr && curr.skillId === id) {
        res.push(
          <ApproachCard
            id={approachId}
            key={approachId} />
        )
      }
    }
    return res
  }, [id, ids, store])

  const sendSwipeEvent = useCallback((ev: NativeSyntheticEvent<NativeScrollEvent>) => {
    analytics.sendSwipeEvent("swipe_across_approaches", ev)
  }, [])

  if (!skill) {
    return null
  }

  // TODO: Maybe sometimes change this to react-native-pager-view
  const Approaches = content.length > 1 ? ScrollView : View

  return (
    <View style={staticStyles.container}>

      <SkillImage name={skill.icon} />

      <Span
        lines={2}
        style={staticStyles.title}>
        {skill.title[__locale()]}
      </Span>

      <Approaches
        style={staticStyles.content}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScrollEndDrag={sendSwipeEvent}
        horizontal>
        {content}
      </Approaches>

    </View>
  )
}

export default memo(WorkoutsListSkill)
