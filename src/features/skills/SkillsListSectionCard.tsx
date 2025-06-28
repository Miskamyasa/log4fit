import {useMemo, type ReactElement} from "react"
import {View} from "react-native"

import {observer} from "mobx-react"

import type {ThemeProps} from "../../colors/types"
import {useThemeColor} from "../../colors/useThemeColor"
import {Divider} from "../../components/Divider"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import type {Categories, Skill} from "../../store/skills/SkillsStore"
import {useStores} from "../../store/useStores"

import {SkillsListItem} from "./SkillsListItem"

const styles = createStaticStyles({
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

function renderSkill(id: Skill["id"], idx: number): ReactElement {
    const item = (
        <SkillsListItem
            key={id}
            id={id} />
    )
    return idx > 0
        ? (
            <View key={id}>
                <Divider />
                {item}
            </View>
        )
        : item
}

export const SkillsListSectionCard = observer(function SkillsListSectionCard(props: {
    title: string,
    category: Categories,
}) {
    const {title, category} = props
    const {skillsStore} = useStores()

    const backgroundColor = useThemeColor("buttonBackground", colors)

    const contentStyles = useMemo(() => {
        return [styles.content, {backgroundColor}]
    }, [backgroundColor])

    if (!skillsStore[category].length) {
        return null
    }

    return (
        <View style={styles.container}>
            <Span style={styles.title}>{title}</Span>
            <View style={contentStyles}>
                {skillsStore[category].map(renderSkill)}
            </View>
        </View>
    )
})
