import React, {ReactElement,
  // useMemo
} from "react"

// import Header, {HeaderIconProps} from "../components/Header"
import Screen from "../components/Screen"
import WorkoutsList from "../features/workouts/WorkoutsList"
// import {__t} from "../i18"
import {HomeStackScreenProps} from "../navigation/types"


function HomeScreen({
  // navigation
}: HomeStackScreenProps<"HomeScreen">): ReactElement {
  // const leftIcon = useMemo((): HeaderIconProps => ({
  //   onPress: (): void => navigation.navigate("AboutScreen", undefined),
  //   iconName: "info-outline",
  // }), [navigation])
  //
  // const rightIcon = useMemo((): HeaderIconProps => ({
  //   onPress: (): void => navigation.navigate("OptionsScreen", undefined),
  //   iconName: "settings",
  // }), [navigation])

  return (
    <Screen unsafe>
      <WorkoutsList />
    </Screen>
  )
}

export default HomeScreen
