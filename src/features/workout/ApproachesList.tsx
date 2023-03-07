import {Fragment, memo, ReactElement, RefObject, useCallback} from "react"
import {FlatList, ListRenderItemInfo, ScrollView, StyleSheet, TextStyle, ViewStyle} from "react-native"

import {isEmpty} from "lodash"


import ApproachCard from "../../components/ApproachCard"
import EmptyCard from "../../components/EmptyCard"
import Span from "../../components/Span"
import {flatList} from "../../constants/defaultStyles"
import layout from "../../constants/layout"
import {__t} from "../../i18"
import {useAppSelector} from "../../store"
import {Skill} from "../../store/skills/types"

import CurrentApproaches from "./CurrentApproaches"


interface Props {
  skillId: Skill["id"]
  scrollRef: RefObject<ScrollView>
}

const header: ViewStyle = {
  marginBottom: layout.gap,
}

const prevSessionTitle: TextStyle = {
  fontSize: 16,
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap,
}

const approachWrapper: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const staticStyles = StyleSheet.create({
  approachWrapper,
  header,
  prevSessionTitle,
})

function ApproachesList({skillId, scrollRef}: Props): ReactElement {
  const ids = useAppSelector(state => {
    const arr = state.approaches.bySkill[skillId] || []
    const workoutId = state.workouts.current?.id
    if (workoutId) {
      const current = new Set(state.approaches.byWorkout[workoutId] || [])
      if (current.size > 0) {
        return arr.filter(id => !current.has(id))
      }
    }
    return arr
  })

  const renderItem = useCallback((data: ListRenderItemInfo<Skill["id"]>) => (
    <ApproachCard
      id={data.item}
      date
      flex />
  ), [])

  const headerComponent = useCallback(() => (
    <CurrentApproaches
      skillId={skillId}
      scrollRef={scrollRef} />
  ), [skillId, scrollRef])

  const footerComponent = useCallback(() => (
    <Fragment>
      <Span style={staticStyles.prevSessionTitle}>{__t("workouts.otherSessions")}</Span>
      {isEmpty(ids) ? (
        <EmptyCard />
      ) : null}
    </Fragment>
  ), [ids])

  return (
    <FlatList
      style={[flatList.root, {width: layout.width}]}
      contentContainerStyle={flatList.contentContainer}
      inverted
      showsVerticalScrollIndicator={false}
      data={ids}
      ListFooterComponent={footerComponent}
      ListHeaderComponentStyle={staticStyles.header}
      ListHeaderComponent={headerComponent}
      renderItem={renderItem} />
  )
}

export default memo(ApproachesList)
