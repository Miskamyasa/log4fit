import {memo} from "react"

import {SkillsList} from "../skills/SkillsList"

import {PageWrapper} from "./PageWrapper"

export const AddSkillView = memo(function AddSkillView() {
  return (
    <PageWrapper>
      <SkillsList />
    </PageWrapper>
  )
})
