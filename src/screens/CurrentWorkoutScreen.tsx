import {ReactElement, useCallback, useRef} from "react"
import {NativeScrollEvent, NativeSyntheticEvent, ScrollView} from "react-native"

import {pick} from "lodash"

import Header from "../components/Header"
import Screen from "../components/Screen"
import AddSkillView from "../features/workout/AddSkillView"
import ApproachesList from "../features/workout/ApproachesList"
import analytics from "../helpers/analytics"
import {__date, __t} from "../i18"
import {HomeStackScreenProps} from "../navigation/types"
import {useAppSelector} from "../store"
import {Skill} from "../store/skills/types"


function CurrentWorkoutScreen({route}: HomeStackScreenProps<"CurrentWorkoutScreen">): ReactElement | null {
  const skills = useAppSelector(state => state.workouts.current?.skills)

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

  const sendSwipeEvent = useCallback(({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    analytics.sendEvent("change_skill_swipe", pick(nativeEvent, ["contentOffset", "contentSize", "layoutMeasurement"]))
  }, [])

  return (
    <Screen unsafe>
      <Header title={`${__t("workouts.screenTitle")}, ${__date(route.params.date)}`} />

      {/* TODO - SUPER TIMER */}

      <ScrollView
        onContentSizeChange={flashIndicator}
        pinchGestureEnabled={false}
        scrollsToTop={false}
        ref={scrollRef}
        onScrollEndDrag={sendSwipeEvent}
        horizontal
        pagingEnabled>

        {skills ? skills.map(renderSkill) : null}

        <AddSkillView />

      </ScrollView>

    </Screen>
  )
}

export default CurrentWorkoutScreen
