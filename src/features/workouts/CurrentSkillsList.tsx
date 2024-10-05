import React, {Fragment, useMemo} from "react"

import {isEmpty} from "lodash"
import {observer} from "mobx-react"

import {Span} from "../../components/Span"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__locale} from "../../helpers/i18n"
import {useAppSelector} from "../../store"
import {Skill} from "../../store/skills/types"
import {useStores} from "../../store/useStores"

const staticStyles = createStaticStyles({
    skillsTitles: {
        textAlign: "right",
        fontSize: 14,
    },
})

export const CurrentSkillsList = observer(function CurrentSkillsList() {
    const {skillsStore} = useStores()

    const current = useAppSelector(state => state.workouts.current)

    const skills: Array<Skill> = useMemo(() => {
        const result = []
        const ids = current?.skills
        if (ids && !isEmpty(ids)) {
            for (let i = 0; i < 3; i++) {
                const skill = skillsStore.registry.get(ids[i])
                if (!isEmpty(skill)) {
                    result.push(skill)
                }
            }
        }
        return result
    }, [current?.skills, skillsStore.registry])

    return (
        <Fragment>
            {skills && skills.length > 0
                ? (
                    <Span
                        lines={3}
                        style={staticStyles.skillsTitles}>
                        {skills
                            .map(skill => skill?.title[__locale()])
                            .join("\n")}
                    </Span>
                )
                : null}
        </Fragment>
    )
})
