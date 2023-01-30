import {memo, ReactElement, useCallback} from "react"
import {ListRenderItemInfo, FlatList} from "react-native"

import {flatList} from "../../constants/defaultStyles"
import {__t} from "../../i18"
import {Categories} from "../../store/skills/types"

import {SelectedSkillProvider} from "./SelectedSkillProvider"
import SkillsListHeader from "./SkillsListHeader"
import SkillsListLoader from "./SkillsListLoader"
import SkillsListSectionCard from "./SkillsListSectionCard"


type SkillsSection = {
  key: Categories,
  title: string,
}

const sections: Array<SkillsSection> = [
  {key: "custom", title: __t("exercises.sections.custom")},
  {key: "base", title: __t("exercises.sections.base")},
  {key: "other", title: __t("exercises.sections.other")},
]

function SkillsList(): ReactElement {
  const keyExtractor = useCallback((item: SkillsSection): string => item.key, [])

  const renderItem = useCallback(({item}: ListRenderItemInfo<SkillsSection>) => (
    <SkillsListSectionCard
      category={item.key}
      title={item.title} />
  ), [])

  return (
    <SelectedSkillProvider>
      <FlatList
        style={flatList.root}
        contentContainerStyle={flatList.contentContainer}
        keyboardShouldPersistTaps="always"
        inverted
        ListFooterComponent={SkillsListLoader}
        ListHeaderComponent={SkillsListHeader}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={sections} />
    </SelectedSkillProvider>
  )
}

export default memo(SkillsList)
