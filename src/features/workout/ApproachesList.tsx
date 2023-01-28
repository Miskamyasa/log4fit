import {Fragment, memo, ReactElement, RefObject, useCallback} from "react"
import {FlatList, ListRenderItemInfo, ScrollView, StyleSheet, TextStyle, ViewStyle} from "react-native"

import {isEmpty} from "lodash"


import EmptyCard from "../../components/EmptyCard"
import Span from "../../components/Span"
import layout from "../../constants/layout"
import {__t} from "../../i18"
import {useAppSelector} from "../../store"
import {Skill} from "../../store/skills/types"

import ApproachesListItem from "./ApproachesListItem"
import CurrentApproaches from "./CurrentApproaches"


type _Props = {
  skillId: Skill["id"],
  scrollRef: RefObject<ScrollView>,
}

const flatList: ViewStyle = {
  paddingTop: layout.iphoneX ? layout.xSafe : layout.gap,
  paddingHorizontal: layout.gap / 2,
  width: layout.width,
}

const header: ViewStyle = {
  marginBottom: layout.gap,
}

const prevSessionTitle: TextStyle = {
  fontSize: 16,
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap,
}

const staticStyles = StyleSheet.create({
  flatList,
  header,
  prevSessionTitle,
})

function ApproachesList({skillId, scrollRef}: _Props): ReactElement {
  const ids = useAppSelector(state => {
    const arr = state.approaches.bySkill[skillId] || []
    const workoutId = state.workouts.current?.id
    if (workoutId) {
      const current = new Set(state.approaches.byWorkout[workoutId] || [])
      if (current.size > 0) {
        return arr.filter(id => !current.has(id)).reverse()
      }
    }
    return arr
  })

  const renderItem = useCallback((data: ListRenderItemInfo<Skill["id"]>) => (
    <ApproachesListItem id={data.item} />
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
      inverted
      showsVerticalScrollIndicator={false}
      style={staticStyles.flatList}
      data={ids}
      ListFooterComponent={footerComponent}
      ListHeaderComponentStyle={staticStyles.header}
      ListHeaderComponent={headerComponent}
      renderItem={renderItem} />
  )
}

export default memo(ApproachesList)
