import {memo, ReactElement, useCallback, useMemo} from "react"
import {Alert, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native"

import {MaterialIcons} from "@expo/vector-icons"


import {ThemeProps} from "../../colors/types"
import {useThemeColor} from "../../colors/useThemeColor"
import Span from "../../components/Span"
import {__date, __day, __t} from "../../i18"
import layout from "../../layout/constants"
import {useAppDispatch, useAppSelector} from "../../store"
import {Skill} from "../../store/skills/types"
import {startWorkout} from "../../store/workouts/actions"
import {Workout} from "../../store/workouts/types"

import WorkoutsListSkill from "./WorkoutsListSkill"


type _Props = {
  id: Workout["id"],
}

const container: ViewStyle = {
  marginBottom: layout.gap,
}

const row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: layout.gap / 3,
}

const header: ViewStyle = {
  ...row,
  paddingHorizontal: layout.gap,
  paddingTop: layout.gap,
}

const content: ViewStyle = {
  marginBottom: layout.gap,
  paddingBottom: layout.gap / 2,
  minHeight: layout.gap,
  borderRadius: layout.gap,
  overflow: "hidden",
}

const day: TextStyle = {
  marginRight: layout.gap,
}

const staticStyles = StyleSheet.create({
  container,
  row,
  header,
  day,
  content,
})

const colors: ThemeProps = {
  light: "#fcfcfe",
  dark: "rgba(14, 16, 18, 0.82)",
}

function WorkoutsListCard({id}: _Props): ReactElement | null {
  const skills = useAppSelector(state => state.workouts.store[id].skills)
  const timestamp = useAppSelector(state => state.workouts.store[id].date)

  const currentWorkoutId = useAppSelector(state => state.workouts.current?.id)

  const backgroundColor = useThemeColor("viewBackground", colors)
  const dimmedBackground = useThemeColor("dimmedBackground")
  const textColor = useThemeColor("text")

  const style = useMemo(() => {
    return {
      list: [staticStyles.content, {backgroundColor}],
      current: [staticStyles.content, {backgroundColor: dimmedBackground}],
    }
  }, [backgroundColor, dimmedBackground])

  const renderSkill = useCallback((skillId: Skill["id"]) => {
    return (
      <WorkoutsListSkill
        key={skillId}
        workoutId={id}
        id={skillId} />
    )
  }, [id])

  const dispatch = useAppDispatch()

  const continueWorkout = useCallback(() => {
    Alert.alert(
      __t("workouts.return"),
      "",
      [
        {text: __t("cancel")},
        {text: __t("continue"), onPress: (): void => { dispatch(startWorkout(id)) }},
      ],
      {cancelable: false}
    )
  }, [id, dispatch])

  const epoch = new Date(timestamp)

  return (
    <View style={id == currentWorkoutId ? style.current : style.list}>

      <View style={staticStyles.header}>

        <View style={staticStyles.row}>
          <Span style={staticStyles.day}>{__day(epoch)}</Span>
          <Span>{__date(epoch)}</Span>
        </View>

        {currentWorkoutId !== id && (
          <TouchableOpacity
            hitSlop={layout.hitSlop}
            onPress={continueWorkout}>
            <MaterialIcons
              name="replay"
              size={20}
              color={textColor} />
          </TouchableOpacity>
        )}
      </View>

      {skills.map(renderSkill)}

    </View>
  )
}

export default memo(WorkoutsListCard)
