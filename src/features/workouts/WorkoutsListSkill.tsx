import {memo, ReactElement, useMemo} from "react"
import {ScrollView, StyleSheet, View, ViewStyle, StyleProp} from "react-native"

import {isEmpty} from "lodash"
import {ImageStyle} from "react-native-fast-image"

import ApproachCard from "../../components/ApproachCard"
import SkillImage from "../../components/SkillImage"
import Span from "../../components/Span"
import layout from "../../constants/layout"
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
  paddingTop: layout.gap / 2,
}

const icon: StyleProp<ImageStyle> = {
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

  if (!skill) {
    return null
  }

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
