import {Fragment, type ReactElement, type RefObject, useCallback} from "react"
import {FlatList, type ListRenderItemInfo, ScrollView, StyleSheet, type TextStyle, type ViewStyle} from "react-native"

import {difference} from "lodash"
import {observer} from "mobx-react"

import {ApproachCard} from "../../components/ApproachCard"
import {EmptyCard} from "../../components/EmptyCard"
import {Span} from "../../components/Span"
import {EMPTY_ARRAY} from "../../constants/common"
import {flatList} from "../../constants/defaultStyles"
import {layout} from "../../constants/layout"
import {__t} from "../../helpers/i18n"
import type {Skill} from "../../store/skills/SkillsStore"
import {useStores} from "../../store/useStores"

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

const renderItem = (data: ListRenderItemInfo<string>): ReactElement => (
    <ApproachCard
        date
        flex
        id={data.item} />
)

export const ApproachesList = observer(function ApproachesList(props: {
    skillId: Skill["id"]
    scrollRef: RefObject<ScrollView>
}) {
    const {skillId, scrollRef} = props
    const {workoutsStore, approachesStore} = useStores()

    const currWorkoutId = workoutsStore.current!
    const idsBySkill = approachesStore.idsBySkill[skillId] || EMPTY_ARRAY

    const ids = difference(idsBySkill, approachesStore.idsByWorkout[currWorkoutId] || EMPTY_ARRAY)

    const headerComponent = useCallback(() => (
        <CurrentApproaches
            scrollRef={scrollRef}
            skillId={skillId} />
    ), [skillId, scrollRef])

    const footerComponent = useCallback(() => (
        <Fragment>
            <Span style={staticStyles.prevSessionTitle}>{__t("workouts.otherSessions")}</Span>
            {!ids.length
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
