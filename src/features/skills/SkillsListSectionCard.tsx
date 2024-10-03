import {memo, useCallback, useMemo} from "react"
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native"

import {isEmpty} from "lodash"

import {ThemeProps} from "../../colors/types"
import {useThemeColor} from "../../colors/useThemeColor"
import {Divider} from "../../components/Divider"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {useAppSelector} from "../../store"
import {Categories, Skill} from "../../store/skills/types"

import SkillsListItem from "./SkillsListItem"

const container: ViewStyle = {
    marginBottom: layout.gap,
}

const title: TextStyle = {
    fontSize: 16,
    paddingHorizontal: layout.gap,
    marginBottom: layout.gap,
}

const content: ViewStyle = {
    marginBottom: layout.gap,
    borderRadius: 6,
    overflow: "hidden",
}

const staticStyles = StyleSheet.create({
    container,
    content,
    title,
})

const colors: ThemeProps = {
    light: "#fefefe",
    dark: "rgba(14, 16, 18, 0.82)",
}

function SkillsListSectionCard({title, category}: {
    title: string
    category: Categories
}) {
    const ids = useAppSelector(state => state.skills.ids[category])
    const backgroundColor = useThemeColor("buttonBackground", colors)

    const contentStyles = useMemo(() => {
        return [staticStyles.content, {backgroundColor}]
    }, [backgroundColor])

    const renderSkill = useCallback((skillId: Skill["id"], idx: number) => {
        const item = (
            <SkillsListItem
                key={skillId}
                id={skillId} />
        )
        return idx > 0
            ? (
                <View key={skillId}>
                    <Divider />
                    {item}
                </View>
            )
            : item
    }, [])

    if (isEmpty(ids)) {
        return null
    }

    return (
        <View style={staticStyles.container}>
            <Span style={staticStyles.title}>{title}</Span>
            <View style={contentStyles}>
                {ids.map(renderSkill)}
            </View>
        </View>
    )
}

export default memo(SkillsListSectionCard)
