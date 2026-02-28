import {useCallback, useRef} from "react"
import {ScrollView} from "react-native"

import {observer} from "mobx-react"

import {EMPTY_ARRAY} from "../../constants/common"
import {useSendSwipeEvent} from "../../hooks/useSendSwipeEvent"
import type {Skill} from "../../store/SkillsStore"
import {useStores} from "../../store/useStores"

import {AddSkillView} from "./AddSkillView"
import {ApproachesList} from "./ApproachesList"

export const CurrentWorkout = observer(function CurrentWorkout() {
  const {workoutsStore} = useStores()

  const currentSkills = workoutsStore.current
    ? workoutsStore.registry[workoutsStore.current].skills
    : EMPTY_ARRAY

  const scrollRef = useRef<ScrollView>(null)

  const renderSkill = useCallback((id: Skill["id"]) => {
    return (
      <ApproachesList
        key={id}
        scrollRef={scrollRef}
        skillId={id} />
    )
  }, [])

  const flashIndicator = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.flashScrollIndicators()
    }
  }, [])

  const sendSwipeEvent = useSendSwipeEvent("change_skill_swipe")

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      pinchGestureEnabled={false}
      scrollsToTop={false}
      onContentSizeChange={flashIndicator}
      onScrollEndDrag={sendSwipeEvent}>
      {currentSkills.map(renderSkill)}
      <AddSkillView />
    </ScrollView>
  )
})
