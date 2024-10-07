import {Fragment, memo, type RefObject, useCallback} from "react"
import {FlatList, type ListRenderItemInfo, ScrollView, StyleSheet, type TextStyle, type ViewStyle} from "react-native"

import {isEmpty} from "lodash"

import {ApproachCard} from "../../components/ApproachCard"
import {EmptyCard} from "../../components/EmptyCard"
import {Span} from "../../components/Span"
import {flatList} from "../../constants/defaultStyles"
import {layout} from "../../constants/layout"
import {__t} from "../../helpers/i18n"
import {useAppSelector} from "../../store"
import {type Skill} from "../../store/skills/types"

import {CurrentApproaches} from "./CurrentApproaches"

const header: ViewStyle = {
    marginBottom: layout.gap,
}

const prevSessionTitle: TextStyle = {
    fontSize: 16,
    paddingHorizontal: layout.gap,
    marginBottom: layout.gap,
}

const staticStyles = StyleSheet.create({
    header,
    prevSessionTitle,
})

export const ApproachesList = memo(function ApproachesList(props: {
    skillId: Skill["id"]
    scrollRef: RefObject<ScrollView>
}) {
    const {skillId, scrollRef} = props

    const ids = useAppSelector((state) => {
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
            date
            flex
            id={data.item} />
    ), [])

    const headerComponent = useCallback(() => (
        <CurrentApproaches
            scrollRef={scrollRef}
            skillId={skillId} />
    ), [skillId, scrollRef])

    const footerComponent = useCallback(() => (
        <Fragment>
            <Span style={staticStyles.prevSessionTitle}>{__t("workouts.otherSessions")}</Span>
            {isEmpty(ids)
                ? (
                    <EmptyCard />
                )
                : null}
        </Fragment>
    ), [ids])

    return (
        <FlatList
            inverted
            contentContainerStyle={flatList.contentContainer}
            data={ids}
            ListFooterComponent={footerComponent}
            ListHeaderComponent={headerComponent}
            ListHeaderComponentStyle={staticStyles.header}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={[flatList.root, {width: layout.width}]} />
    )
})
