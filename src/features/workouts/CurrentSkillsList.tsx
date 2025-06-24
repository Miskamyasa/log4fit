import React, {Fragment} from "react"

import {observer} from "mobx-react"

import {Span} from "../../components/Span"
import {EMPTY_ARRAY} from "../../constants/common"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__locale} from "../../helpers/i18n"
import {useStores} from "../../store/useStores"

const staticStyles = createStaticStyles({
    skillsTitles: {
        textAlign: "right",
        fontSize: 14,
    },
})

export const CurrentSkillsList = observer(function CurrentSkillsList() {
    const {skillsStore, workoutsStore} = useStores()

    const skills = workoutsStore.registry[workoutsStore.current!]?.skills || EMPTY_ARRAY

    return (
        <Fragment>
            {skills.length
                ? (
                    <Span
                        lines={3}
                        style={staticStyles.skillsTitles}>
                        {skills.slice(0, 3)
                            .map(id => skillsStore.registry[id].title[__locale()])
                            .join("\n")}
                    </Span>
                )
                : null}
        </Fragment>
    )
})
