import {memo, type ReactElement} from "react"
import {FlatList} from "react-native"

import {flatList} from "../../constants/defaultStyles"
import {__t} from "../../helpers/i18n"
import type {Categories} from "../../store/skills/SkillsStore"

import {SelectedSkillProvider} from "./SelectedSkillProvider"
import {SkillsListHeader} from "./SkillsListHeader"
import {SkillsListLoader} from "./SkillsListLoader"
import {SkillsListSectionCard} from "./SkillsListSectionCard"

interface SkillsSection {
  key: Categories
  title: string
}

const sections: SkillsSection[] = [
  {key: "custom", title: __t("exercises.sections.custom")},
  {key: "base", title: __t("exercises.sections.base")},
  {key: "other", title: __t("exercises.sections.other")},
]

function renderItem({item}: {item: SkillsSection}): ReactElement {
  return (
    <SkillsListSectionCard
      category={item.key}
      title={item.title} />
  )
}

const keyExtractor = function keyExtractor(item: SkillsSection): string {
  return item.key
}

export const SkillsList = memo(function SkillsList() {
  return (
    <SelectedSkillProvider>
      <FlatList
        inverted
        contentContainerStyle={flatList.contentContainer}
        data={sections}
        keyboardShouldPersistTaps="always"
        keyExtractor={keyExtractor}
        ListFooterComponent={SkillsListLoader}
        ListHeaderComponent={SkillsListHeader}
        renderItem={renderItem}
        style={flatList.root} />
    </SelectedSkillProvider>
  )
})
