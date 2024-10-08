import {useCallback, useContext, type ReactElement} from "react"
import {StyleSheet, TouchableOpacity, type ViewStyle} from "react-native"

import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import {isEmpty} from "lodash"
import {observer} from "mobx-react"

import {useThemeColor} from "../../colors/useThemeColor"
import {Div} from "../../components/Div"
import SkillImage from "../../components/SkillImage"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {analytics} from "../../helpers/analytics"
import {__locale} from "../../helpers/i18n"
import {navigation} from "../../navigation/config"
import {useAppSelector} from "../../store"
import type {Skill} from "../../store/skills/types"
import {useStores} from "../../store/useStores"

import {SelectedSkillContext} from "./SelectedSkillProvider"

const container: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    paddingVertical: layout.gap,
    height: 46,
}

const selected: ViewStyle = {
    ...container,
    backgroundColor: "rgba(184,184,184, 0.2)",
}

const help: ViewStyle = {
    marginRight: layout.gap,
}

const staticStyles = StyleSheet.create({
    container,
    help,
    selected,
})

const hitSlop = {left: 8, top: 8, right: 8, bottom: 8}

export const SkillsListItem = observer(function SkillsListItem({id}: {
    id: Skill["id"]
}): ReactElement | null {
    const {skillsStore} = useStores()
    const color = useThemeColor("text")

    const skill = skillsStore.registry.get(id)!

    const currentSkills = useAppSelector(state => state.workouts.current?.skills)

    const {selected, setSelected} = useContext(SelectedSkillContext)

    const showInfoScreen = useCallback(() => {
        analytics.sendEvent("show_info_for_skill", {title: skill.title["en"]})
        navigation.navigate("SkillInfoScreen", {id})
    }, [id, skill.title])

    const toggleSelected = useCallback(() => {
        setSelected(skill)
    }, [skill, setSelected])

    if (isEmpty(skill)) {
        return null
    }

    return (
        <Div
            disabled={currentSkills?.includes(skill.id)}
            style={selected?.id === id ? staticStyles.selected : staticStyles.container}
            onPress={toggleSelected}>
            <SkillImage name={skill.icon} />
            <Span
                flex
                size={16}>
                {skill.title[__locale()]}
            </Span>
            {skill.category !== "custom" && skill.description[__locale()]
                ? (
                    <TouchableOpacity
                        hitSlop={hitSlop}
                        style={staticStyles.help}
                        onPress={showInfoScreen}>
                        <MaterialIcons
                            color={color}
                            name="help-outline"
                            size={20} />
                    </TouchableOpacity>
                )
                : null}
        </Div>
    )
})
