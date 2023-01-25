import {memo, ReactElement, useCallback} from "react"

import {isEmpty} from "lodash"
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native"


import {primaryColors, secondaryColors} from "../../colors/colors"
import Div from "../../components/Div"
import Span from "../../components/Span"
import {__locale, __t} from "../../i18"
import layout from "../../layout/constants"
import {navigation} from "../../navigation/config"
import {useAppDispatch, useAppSelector} from "../../store"
import {Skill} from "../../store/skills/types"
import {addWorkout} from "../../store/workouts/actions"


const container: ViewStyle = {
  overflow: "hidden",
  borderRadius: layout.gap,
  height: 140,
}

const content: ViewStyle = {
  flex: 1,
  paddingVertical: layout.gap,
  paddingHorizontal: layout.gap + 4,
}

const topContent: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "flex-start",
}

const bottomContent: ViewStyle = {
  flex: 1.5,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: layout.gap / 2 + 1,
}

const skillsTitles: TextStyle = {
  textAlign: "right",
  fontSize: 15,
}

const createNew: ViewStyle = {
  borderRadius: layout.gap,
  overflow: "hidden",
  height: 54,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: layout.gap * 2,
}

const staticStyles = StyleSheet.create({
  container,
  content,
  topContent,
  bottomContent,
  skillsTitles,
  createNew,
})

function WorkoutsListHeader(): ReactElement {
  const workout = useAppSelector(state => state.workouts.current)
  const skills: Array<Skill> = useAppSelector(state => {
    const result = []
    const store = state.skills.store
    const ids = workout?.skills
    if (ids && !isEmpty(ids)) {
      for (let i = 0; i < 2; i++) {
        const skill = store[ids[i]]
        if (!isEmpty(skill)) {
          result.push(skill)
        }
      }
    }
    return result
  })


  const dispatch = useAppDispatch()

  const createNewWorkout = useCallback(() => {
    dispatch(addWorkout())
  }, [dispatch])

  const continueWorkout = useCallback(() => {
    if (workout?.date) {
      navigation.navigate("CurrentWorkoutScreen", {date: workout.date})
    }
  }, [workout?.date])

  return (
    <Div
      onPress={workout?.id ? continueWorkout : createNewWorkout}
      theme={secondaryColors.background}
      style={staticStyles.container}>

      <View style={staticStyles.content}>

        <View style={staticStyles.topContent}>
          <Span
            theme={secondaryColors.color}
            weight="600"
            flex
            lines={1}
            size={24}>
            {__t(workout?.id ? "workouts.continueWorkout" : "workouts.startWorkout")}
          </Span>
        </View>

        <View style={staticStyles.bottomContent}>
          {workout?.id ? (
            <Div
              onPress={createNewWorkout}
              theme={primaryColors.background}
              style={staticStyles.createNew}>
              <Span colorName={"alwaysWhite"}>
                {__t("workouts.createNew")}
              </Span>
            </Div>
          ) : null}

          {skills && skills.length > 0 ? (
            <Span
              style={staticStyles.skillsTitles}
              lines={3}>
              {skills
                .map(skill => skill?.title[__locale()])
                .join("\n")}
            </Span>
          ) : null}
        </View>

      </View>

    </Div>
  )
}

export default memo(WorkoutsListHeader)
