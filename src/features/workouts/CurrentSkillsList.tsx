import React, {Fragment, memo, ReactElement} from "react"

import {isEmpty} from "lodash"

import Span from "../../components/Span"
import createStaticStyles from "../../helpers/createStaticStyles"
import {__locale} from "../../i18"
import {useAppSelector} from "../../store"
import {Skill} from "../../store/skills/types"


const staticStyles = createStaticStyles({
    skillsTitles: {
        textAlign: "right",
        fontSize: 14,
    },
})

function CurrentSkillsList(): ReactElement {
    const current = useAppSelector(state => state.workouts.current)

    const skills: Array<Skill> = useAppSelector(state => {
        const result = []
        const store = state.skills.store
        const ids = current?.skills
        if (ids && !isEmpty(ids)) {
            for (let i = 0; i < 3; i++) {
                const skill = store[ids[i]]
                if (!isEmpty(skill)) {
                    result.push(skill)
                }
            }
        }
        return result
    })

    return (
        <Fragment>
            {skills && skills.length > 0 ? (
                <Span
                    lines={3}
                    style={staticStyles.skillsTitles}>
                    {skills
                        .map(skill => skill?.title[__locale()])
                        .join("\n")}
                </Span>
            ) : null}
        </Fragment>
    )
}

export default memo(CurrentSkillsList)
