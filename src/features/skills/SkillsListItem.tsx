import {useCallback, useContext} from "react"
import {TouchableOpacity, type ViewStyle} from "react-native"

import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import {observer} from "mobx-react"

import {useThemeColor} from "../../colors/useThemeColor"
import {Div} from "../../components/Div"
import SkillImage from "../../components/SkillImage"
import {Span} from "../../components/Span"
import {EMPTY_ARRAY} from "../../constants/common"
import {layout} from "../../constants/layout"
import {analytics} from "../../helpers/analytics"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__locale} from "../../helpers/i18n"
import {navigation} from "../../navigation/config"
import type {Skill} from "../../store/skills/SkillsStore"
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

const staticStyles = createStaticStyles({
    container,
    help: {
        marginRight: layout.gap,
    },
    selected,
})

export const SkillsListItem = observer(function SkillsListItem(props: {
    id: Skill["id"]
}) {
    const color = useThemeColor("text")
    const {skillsStore, workoutsStore} = useStores()

    const skill = skillsStore.registry[props.id]

    const currentSkills = workoutsStore.registry[workoutsStore.current!]?.skills || EMPTY_ARRAY

    const {selected, setSelected} = useContext(SelectedSkillContext)

    const showInfoScreen = useCallback(() => {
        analytics.trackEvent("show_info_for_skill", {title: skill.title["en"]})
        navigation.navigate("SkillInfoScreen", {id: props.id})
    }, [props.id, skill.title])

    const toggleSelected = useCallback(() => {
        setSelected(skill)
    }, [skill, setSelected])

    return (
        <Div
            disabled={currentSkills?.includes(skill.id)}
            style={selected?.id === props.id ? staticStyles.selected : staticStyles.container}
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
                        hitSlop={layout.hitSlop}
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
