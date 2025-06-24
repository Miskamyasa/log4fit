import {Fragment, type RefObject} from "react"
import {ScrollView, View} from "react-native"

import {observer} from "mobx-react"

import {ApproachCard} from "../../components/ApproachCard"
import {EmptyCard} from "../../components/EmptyCard"
import {PageTitle} from "../../components/PageTitle"
import {Span} from "../../components/Span"
import {EMPTY_ARRAY} from "../../constants/common"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__locale, __t} from "../../helpers/i18n"
import type {Skill} from "../../store/skills/SkillsStore"
import {useStores} from "../../store/useStores"

import {AddApproachButton} from "./AddApproachButton"
import {AddSkillButton} from "./AddSkillButton"

const staticStyles = createStaticStyles({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: layout.gap,
    },
    content: {
        marginBottom: layout.gap,
    },
    approaches: {
        borderRadius: layout.gap,
        overflow: "hidden",
    },
    sessionTitle: {
        fontSize: 16,
        paddingHorizontal: layout.gap,
        marginBottom: layout.gap,
    },
})

export const CurrentApproaches = observer(function CurrentApproaches(props: {
    skillId: Skill["id"]
    scrollRef: RefObject<ScrollView>
}) {
    const {skillId, scrollRef} = props
    const {skillsStore, workoutsStore, approachesStore} = useStores()

    const skill = skillsStore.registry[skillId]
    const ids = (approachesStore.idsByWorkout[workoutsStore.current!] || EMPTY_ARRAY).filter(id =>
        approachesStore.registry[id].skillId === skillId,
    )

    const {weight, repeats} = approachesStore.registry[ids[ids.length - 1]] || {}

    return (
        <Fragment>
            <View style={staticStyles.content}>
                <Span style={staticStyles.sessionTitle}>{__t("workouts.sessionTitle")}</Span>
                <View style={staticStyles.approaches}>
                    {ids.length
                        ? ids.map(id => (
                            <ApproachCard
                                key={id}
                                flex
                                id={id} />
                        ))
                        : (
                            <EmptyCard />
                        )}
                </View>
            </View>
            <View style={staticStyles.container}>
                <AddSkillButton scrollRef={scrollRef} />
                <AddApproachButton
                    lastRepeats={repeats}
                    lastWeight={weight}
                    skillId={skillId} />
            </View>
            <PageTitle
                icon={skill.icon}
                title={skill.title[__locale()]} />
        </Fragment>
    )
})
