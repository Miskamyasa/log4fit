import {memo, ReactElement, useCallback, useMemo} from "react"

import {isEmpty} from "lodash"
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native"


import {ThemeProps} from "../../colors/types"
import {useThemeColor} from "../../colors/useThemeColor"
import Divider from "../../components/Divider"
import Span from "../../components/Span"
import layout from "../../layout/constants"
import {useAppSelector} from "../../store"
import {Categories, Skill} from "../../store/skills/types"

import SkillsListItem from "./SkillsListItem"


type _Props = {
  title: string,
  category: Categories,
}

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
  title,
  content,
})

const colors: ThemeProps = {
  light: "#fefefe",
  dark: "rgba(14, 16, 18, 0.82)",
}

function SkillsListSectionCard({title, category}: _Props): ReactElement | null {
  const ids = useAppSelector(state => state.skills.ids[category])
  const backgroundColor = useThemeColor("buttonBackground", colors)

  const contentStyles = useMemo(() => {
    return StyleSheet.compose(staticStyles.content, {backgroundColor})
  }, [backgroundColor])

  const renderSkill = useCallback((skillId: Skill["id"], idx: number) => {
    const item = (
      <SkillsListItem
        key={skillId}
        id={skillId} />
    )
    return idx > 0 ? (
      <View key={skillId}>
        <Divider />
        {item}
      </View>
    ) : item
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
