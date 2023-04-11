import {memo, ReactElement, useCallback} from "react"
import {ListRenderItemInfo, FlatList} from "react-native"

import {flatList} from "../../constants/defaultStyles"
import {__t} from "../../helpers/i18n"
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
}

export default memo(SkillsList)
