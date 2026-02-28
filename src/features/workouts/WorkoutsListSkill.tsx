import {useMemo} from "react"
import {ScrollView, View} from "react-native"

import {observer} from "mobx-react"

import {ApproachCard} from "../../components/ApproachCard"
import {SkillImage} from "../../components/SkillImage"
import {Span} from "../../components/Span"
import {EMPTY_ARRAY} from "../../constants/common"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__locale} from "../../helpers/i18n"
import {useSendSwipeEvent} from "../../hooks/useSendSwipeEvent"
import type {Skill} from "../../store/SkillsStore"
import {useStores} from "../../store/useStores"
import type {Workout} from "../../store/WorkoutsStore"

const staticStyles = createStaticStyles({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    paddingBottom: layout.gap,
    paddingRight: layout.gap,
  },
  title: {
    width: layout.skillTitleWidth,
    alignItems: "flex-start",
    borderRadius: 8,
    overflow: "hidden",
    paddingRight: layout.gap / 2,
    marginRight: "auto",
  },
  content: {
    fontSize: 13,
    lineHeight: 13,
    paddingRight: layout.gap / 2,
  },
})

export const WorkoutsListSkill = observer(function WorkoutsListSkill(props: {
  id: Skill["id"],
  workoutId: Workout["id"],
}) {
  const {skillsStore, approachesStore} = useStores()

  const skill = skillsStore.registry[props.id]
  const ids = approachesStore.idsByWorkout[props.workoutId] ?? EMPTY_ARRAY

  const content = useMemo(() => {
    const res = []
    for (const approachId of ids) {
      const curr = approachesStore.registry[approachId]
      if (curr.skillId === props.id) {
        res.push((
          <ApproachCard
            key={approachId}
            id={approachId}/>
        ))
      }
    }
    return res
  }, [approachesStore, props.id, ids])

  const sendSwipeEvent = useSendSwipeEvent("swipe_across_approaches")

  const Wrapper = content.length > 1 ? ScrollView : View

  return (
    <View style={staticStyles.container}>
      <SkillImage name={skill.icon}/>
      <Span
        lines={2}
        style={staticStyles.title}>
        {skill.title[__locale()]}
      </Span>
      <Wrapper
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={staticStyles.content}
        onScrollEndDrag={sendSwipeEvent}>
        {content}
      </Wrapper>
    </View>
  )
})
