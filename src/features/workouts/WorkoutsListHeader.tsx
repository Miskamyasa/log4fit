import {Fragment, memo, ReactElement, useCallback} from "react"
import {View} from "react-native"

import {secondaryColors} from "../../colors/colors"
import Div from "../../components/Div"
import OverlayLoader from "../../components/OverlayLoader"
import Span from "../../components/Span"
import layout from "../../constants/layout"
import analytics from "../../helpers/analytics"
import createStaticStyles from "../../helpers/createStaticStyles"
import {__t} from "../../i18"
import {navigation} from "../../navigation/config"
import {useAppDispatch, useAppSelector} from "../../store"
import {addWorkout} from "../../store/workouts/actions"

import CreateNew from "./CreateNew"
import CurrentSkillsList from "./CurrentSkillsList"


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

function WorkoutsListHeader(): ReactElement {
  const current = useAppSelector(state => state.workouts.current)
  const loading = useAppSelector(state => state.workouts.loading)

  const dispatch = useAppDispatch()

  const createNewWorkout = useCallback(() => {
    analytics.sendEvent("create_first_workout")
    dispatch(addWorkout())
  }, [dispatch])

  const continueWorkout = useCallback(() => {
    if (current?.date) {
      analytics.sendEvent("continue_workout_pressed")
      navigation.navigate("CurrentWorkoutScreen", {date: current.date})
    }
  }, [current?.date])

  return (
    <Div
      style={staticStyles.container}
      theme={secondaryColors.background}
      onPress={current?.id ? continueWorkout : createNewWorkout}>

      {loading ? (
        <OverlayLoader />
      ) : null}

      <View style={staticStyles.content}>

        <View style={staticStyles.topContent}>
          <Span
            flex
            lines={1}
            size={24}
            theme={secondaryColors.color}
            weight="600">
            {__t(current?.id ? "workouts.continueWorkout" : "workouts.startWorkout")}
          </Span>
        </View>

        {current?.id && (
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
}

export default memo(WorkoutsListHeader)
