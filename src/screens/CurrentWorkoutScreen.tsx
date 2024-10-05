import {useCallback, useRef, type ReactElement} from "react"
import {ScrollView} from "react-native"

import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
import {AddSkillView} from "../features/workout/AddSkillView"
import {ApproachesList} from "../features/workout/ApproachesList"
import {__date, __t} from "../helpers/i18n"
import {useSendSwipeEvent} from "../hooks/useSendSwipeEvent"
import type {HomeStackParamList, NavigationProps} from "../navigation/types"
import {useAppSelector} from "../store"
import {Skill} from "../store/skills/types"

export function CurrentWorkoutScreen(props: NavigationProps<HomeStackParamList, "CurrentWorkoutScreen">): ReactElement {
    const {route} = props
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

    const sendSwipeEvent = useSendSwipeEvent("change_skill_swipe")

    return (
        <Screen>
            <Header title={`${__t("workouts.screenTitle")}, ${__date(route.params.date)}`} />

            {/* TODO - SUPER TIMER */}

            {/* TODO: Maybe sometimes change this to react-native-pager-view */}
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                pinchGestureEnabled={false}
                scrollsToTop={false}
                onContentSizeChange={flashIndicator}
                onScrollEndDrag={sendSwipeEvent}>

                {skills ? skills.map(renderSkill) : null}

                <AddSkillView />

            </ScrollView>

        </Screen>
    )
}
