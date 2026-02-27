import {Fragment, useCallback} from "react"
import {View} from "react-native"

import {observer} from "mobx-react"

import {secondaryColors} from "../../colors/colors"
import {Div} from "../../components/Div"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {analytics} from "../../helpers/analytics"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__t} from "../../helpers/i18n"
import {navigation} from "../../navigation/config"
import {useStores} from "../../store/useStores"

import {CreateNew} from "./CreateNew"
import {CurrentSkillsList} from "./CurrentSkillsList"

const staticStyles = createStaticStyles({
  container: {
    overflow: "hidden",
    borderRadius: layout.gap,
    height: 130,
  },
  content: {
    flex: 1,
    paddingVertical: layout.gap,
    paddingHorizontal: layout.gap + 4,
  },
  topContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bottomContent: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: layout.gap / 2 + 1,
  },
})

export const WorkoutsListHeader = observer(function WorkoutsListHeader() {
  const {workoutsStore} = useStores()

  const currWorkout = workoutsStore.current
    ? workoutsStore.registry[workoutsStore.current]
    : undefined

  const createNewWorkout = useCallback(() => {
    analytics.trackEvent("create_first_workout")
    workoutsStore.addWorkout()
  }, [workoutsStore])

  const continueWorkout = useCallback(() => {
    if (currWorkout) {
      analytics.trackEvent("continue_workout_pressed")
      navigation.navigate("CurrentWorkoutScreen", {
        date: currWorkout.date,
      })
    }
  }, [currWorkout])

  return (
    <Div
      style={staticStyles.container}
      theme={secondaryColors.background}
      onPress={currWorkout?.id ? continueWorkout : createNewWorkout}>
      <View style={staticStyles.content}>
        <View style={staticStyles.topContent}>
          <Span
            flex
            lines={1}
            size={24}
            weight="600">
            {__t(currWorkout?.id ? "workouts.continueWorkout" : "workouts.startWorkout")}
          </Span>
        </View>
        {currWorkout?.id && (
          <View style={staticStyles.bottomContent}>
            <Fragment>
              <CreateNew />
              <CurrentSkillsList />
            </Fragment>
          </View>
        )}
      </View>
    </Div>
  )
})
