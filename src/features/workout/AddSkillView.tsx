import {memo, ReactElement} from "react"

import PageWrapper from "../../components/PageWrapper"
import SkillsList from "../skills/SkillsList"


function AddSkillView(): ReactElement {
    return (
        <PageWrapper>
            <SkillsList />
        </PageWrapper>
    )
}

export default memo(AddSkillView)
