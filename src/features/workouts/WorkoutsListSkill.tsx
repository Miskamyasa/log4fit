import {memo, ReactElement, useMemo} from "react"
import {ImageStyle, ScrollView, StyleSheet, View, ViewStyle} from "react-native"

import {isEmpty, reduce} from "lodash"


import ApproachCard from "../../components/ApproachCard"
import SkillImage from "../../components/SkillImage"
import Span from "../../components/Span"
import {__locale} from "../../i18"
import layout from "../../layout/constants"
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
  paddingTop: layout.gap / 2,
}

const icon: ImageStyle = {
  zIndex: 2,
  width: 32,
  height: 32,
  overflow: "hidden",
  borderRadius: 8,
  marginLeft: layout.gap / 2,
  marginRight: layout.gap,
}

const content: ViewStyle = {
  height: 42,
  flex: 1,
  borderRadius: 8,
  overflow: "hidden",
  marginRight: layout.gap / 2,
}

const staticStyles = StyleSheet.create({container, icon, content})

function WorkoutsListSkill({id, workoutId}: _Props): ReactElement | null {
  const skill = useAppSelector(state => state.skills.store[id])

  if (!skill) {
    return null
  }

  const store = useAppSelector(state => state.approaches.store)
  const ids = useAppSelector(state => state.approaches.byWorkout[workoutId])

  const content = useMemo(() => {
    if (isEmpty(ids)) {
      return []
    }
    const [firstId, ...rest] = ids
    return reduce(rest, (acc, id) => {
      const curr = store[id]
      if (curr.skillId !== skill.id) {
        return acc
      }
      const prev = acc.pop()
      if (prev) {
        if (prev.weight !== curr.weight || prev.repeats !== curr.repeats) {
          acc.push(prev, {...curr, counter: 1})
        } else {
          acc.push({...prev, counter: prev.counter + 1})
        }
      }
      return acc
    }, [{counter: 1, ...store[firstId]}])
      .map(item => (
        <ApproachCard
          key={item.id}
          {...item} />
      ))
  }, [ids, store, skill.id])

  const Approaches = content.length > 1 ? ScrollView : View

  return (
    <View style={staticStyles.container}>

      <SkillImage
        uri={skill.icon}
        style={staticStyles.icon} />

      <Span
        style={{
          fontSize: 13,
          width: 100,
        }}>
        {skill.title[__locale()]}
      </Span>

      <Approaches
        style={staticStyles.content}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal>
        {content}
      </Approaches>

    </View>
  )
}

export default memo(WorkoutsListSkill)
