import {useMemo, type ReactElement} from "react"
import {StyleSheet, View} from "react-native"

import {isEmpty} from "lodash"
import {observer} from "mobx-react"

import type {ThemeProps} from "../../colors/types"
import {useThemeColor} from "../../colors/useThemeColor"
import {Divider} from "../../components/Divider"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import type {Categories, Skill} from "../../store/skills/types"
import {useStores} from "../../store/useStores"

import {SkillsListItem} from "./SkillsListItem"

const styles = StyleSheet.create({
    container: {
        marginBottom: layout.gap,
    },
    content: {
        borderRadius: 6,
        marginBottom: layout.gap,
        overflow: "hidden",
    },
    title: {
        fontSize: 16,
        marginBottom: layout.gap,
        paddingHorizontal: layout.gap,
    },
})

const colors: ThemeProps = {
    light: "#fefefe",
    dark: "rgba(14, 16, 18, 0.82)",
}

function renderSkill(skillId: Skill["id"], idx: number): ReactElement {
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
}

export const SkillsListSectionCard = observer(function SkillsListSectionCard(props: {
    title: string
    category: Categories
}): ReactElement | null {
    const {title, category} = props
    const {skillsStore} = useStores()

    const backgroundColor = useThemeColor("buttonBackground", colors)

    const contentStyles = useMemo(() => {
        return [styles.content, {backgroundColor}]
    }, [backgroundColor])

    if (isEmpty(skillsStore.ids[category])) {
        return null
    }

    return (
        <View style={styles.container}>
            <Span style={styles.title}>{title}</Span>
            <View style={contentStyles}>
                {skillsStore.ids[category].map(renderSkill)}
            </View>
        </View>
    )
})
