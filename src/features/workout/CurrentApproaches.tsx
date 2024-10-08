import {Fragment, type RefObject} from "react"
import {ScrollView, View} from "react-native"

import {get, isEmpty, pick} from "lodash"
import {observer} from "mobx-react"

import {ApproachCard} from "../../components/ApproachCard"
import {EmptyCard} from "../../components/EmptyCard"
import {PageTitle} from "../../components/PageTitle"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__locale, __t} from "../../helpers/i18n"
import {useAppSelector} from "../../store"
import type {Approach} from "../../store/approaches/types"
import type {Skill} from "../../store/skills/types"
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
    const {skillsStore} = useStores()

    const skill = skillsStore.registry.get(skillId)!

    const approaches = useAppSelector((state) => {
        const result: Approach[] = []
        const workoutId = state.workouts.current?.id
        if (workoutId) {
            const store = state.approaches.store
            const ids = state.approaches.byWorkout[workoutId]
            if (isEmpty(ids)) {
                return result
            }
            for (const id of ids) {
                const item = store[id]
                if (item.skillId === skillId) {
                    result.push(item)
                }
            }
        }
        return result
    })

    const {weight, repeats}: Partial<Approach> = pick(
        get(approaches, [approaches?.length - 1], {}),
        ["weight", "repeats"],
    )

    return (
        <Fragment>
            <View style={staticStyles.content}>
                <Span style={staticStyles.sessionTitle}>{__t("workouts.sessionTitle")}</Span>
                <View style={staticStyles.approaches}>
                    {!isEmpty(approaches)
                        ? approaches.map(item => (
                            <ApproachCard
                                key={item.id}
                                flex
                                id={item.id} />
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
