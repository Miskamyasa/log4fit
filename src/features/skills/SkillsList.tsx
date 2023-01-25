import React, {memo, ReactElement, useCallback} from "react"

import {ListRenderItemInfo, FlatList, StyleSheet, ViewStyle} from "react-native"

import {__t} from "../../i18"
import layout from "../../layout/constants"
import {Categories} from "../../store/skills/types"

import {SelectedSkillProvider} from "./SelectedSkillProvider"
import SkillsListHeader from "./SkillsListHeader"
import SkillsListLoader from "./SkillsListLoader"
import SkillsListSectionCard from "./SkillsListSectionCard"


const flatList: ViewStyle = {
  paddingTop: layout.iphoneX ? layout.xSafe : layout.gap,
  paddingHorizontal: layout.gap / 2,
}

const staticStyles = StyleSheet.create({flatList})

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
        keyboardShouldPersistTaps="always"
        style={staticStyles.flatList}
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
