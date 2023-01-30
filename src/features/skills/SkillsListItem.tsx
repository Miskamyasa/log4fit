import {memo, ReactElement, useCallback, useContext} from "react"
import {StyleSheet, TouchableOpacity, ViewStyle, StyleProp} from "react-native"

import {MaterialIcons} from "@expo/vector-icons"
import {isEmpty} from "lodash"
import {ImageStyle} from "react-native-fast-image"

import {useThemeColor} from "../../colors/useThemeColor"
import Div from "../../components/Div"
import SkillImage from "../../components/SkillImage"
import Span from "../../components/Span"
import layout from "../../constants/layout"
import analytics from "../../helpers/analytics"
import {__locale} from "../../i18"
import {navigation} from "../../navigation/config"
import {useAppSelector} from "../../store"
import {Skill} from "../../store/skills/types"

import {SelectedSkillContext} from "./SelectedSkillProvider"


type _Props = {
  id: Skill["id"],
}

const container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  overflow: "hidden",
  paddingVertical: layout.gap / 2,
  height: 36,
}

const selected: ViewStyle = {
  ...container,
  backgroundColor: "rgba(184,184,184, 0.2)",
}

const icon: StyleProp<ImageStyle> = {
  zIndex: 2,
  width: 28,
  height: 28,
  overflow: "hidden",
  borderRadius: 6,
  marginLeft: layout.gap / 2,
  marginRight: layout.gap,
}

const help: ViewStyle = {
  marginRight: layout.gap,
}

const staticStyles = StyleSheet.create({
  container,
  selected,
  icon,
  help,
})

const hitSlop = {left: 8, top: 8, right: 8, bottom: 8}

function SkillsListItem({id}: _Props): ReactElement | null {
  const color = useThemeColor("text")

  const skill = useAppSelector(state => state.skills.store[id])
  const currentSkills = useAppSelector(state => state.workouts.current?.skills)

  const {selected, setSelected} = useContext(SelectedSkillContext)

  const showInfoScreen = useCallback(() => {
    navigation.navigate("SkillInfoScreen", {id})
  }, [id])

  const toggleSelected = useCallback(() => {
    analytics.sendEvent("skill_in_select_list_pressed")
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

      <SkillImage
        uri={skill.icon}
        style={staticStyles.icon} />

      <Span
        flex
        size={16}>
        {skill.title[__locale()]}
      </Span>

      {skill.category !== "custom" ? (
        <TouchableOpacity
          style={staticStyles.help}
          onPress={showInfoScreen}
          hitSlop={hitSlop}>
          <MaterialIcons
            color={color}
            name={"help-outline"}
            size={20} />
        </TouchableOpacity>
      ) : null}

    </Div>
  )
}

export default memo(SkillsListItem)
