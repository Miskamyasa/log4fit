import {useMemo} from "react"

import {Header, type HeaderIconProps} from "../components/Header"
import {Screen} from "../components/Screen"
import {WorkoutsList} from "../features/workouts/WorkoutsList"
import {__t} from "../helpers/i18n"
import type {HomeStackParamList, NavigationProps} from "../navigation/types"

export function HomeScreen({navigation}: NavigationProps<HomeStackParamList, "HomeScreen">) {
  const leftIcon = useMemo((): HeaderIconProps => ({
    onPress: (): void => {navigation.navigate("OptionsScreen", undefined)},
    iconName: "settings",
  }), [navigation])

  const rightIcon = useMemo((): HeaderIconProps => ({
    onPress: (): void => {navigation.navigate("AboutScreen", undefined)},
    iconName: "info-outline",
  }), [navigation])

  return (
    <Screen>
      <Header
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        title={__t("homeScreen.title")} />
      <WorkoutsList />
    </Screen>
  )
}
