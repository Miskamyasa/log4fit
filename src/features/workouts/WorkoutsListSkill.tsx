import {memo, useMemo} from "react"
import {ScrollView, View} from "react-native"

import {isEmpty} from "lodash"

import {ApproachCard} from "../../components/ApproachCard"
import SkillImage from "../../components/SkillImage"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__locale} from "../../helpers/i18n"
import {useSendSwipeEvent} from "../../hooks/useSendSwipeEvent"
import {useAppSelector} from "../../store"
import {Skill} from "../../store/skills/types"
import {Workout} from "../../store/workouts/types"

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
        marginRight: layout.gap,
    },
    content: {
        fontSize: 13,
        lineHeight: 13,
        paddingRight: layout.gap / 2,
    },
})

function WorkoutsListSkill(props: {
    id: Skill["id"]
    workoutId: Workout["id"]
}) {
    const {id, workoutId} = props

    const skill = useAppSelector(state => state.skills.store[id])

    const store = useAppSelector(state => state.approaches.store)
    const ids = useAppSelector(state => state.approaches.byWorkout[workoutId])

    const content = useMemo(() => {
        if (isEmpty(ids)) {
            return []
        }
        const res = []
        for (const approachId of ids) {
            const curr = store[approachId]
            if (curr && curr.skillId === id) {
                res.push(
                    <ApproachCard
                        key={approachId}
                        id={approachId} />,
                )
            }
        }
        return res
    }, [id, ids, store])

    const sendSwipeEvent = useSendSwipeEvent("swipe_across_approaches")

    if (!skill) {
        return null
    }

    const Approaches = content.length > 1 ? ScrollView : View

    return (
        <View style={staticStyles.container}>

            <SkillImage name={skill.icon} />

            <Span
                lines={2}
                style={staticStyles.title}>
                {skill.title[__locale()]}
            </Span>

            <Approaches
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={staticStyles.content}
                onScrollEndDrag={sendSwipeEvent}>
                {content}
            </Approaches>

        </View>
    )
}

export default memo(WorkoutsListSkill)
