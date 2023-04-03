import {ReactElement} from "react"

import Screen from "../components/Screen"
import WorkoutsList from "../features/workouts/WorkoutsList"
// import {HomeStackScreenProps} from "../navigation/types"

// props: HomeStackScreenProps<"HomeScreen">
function HomeScreen(): ReactElement {
    // TODO: Add header icons
    // const leftIcon = useMemo((): HeaderIconProps => ({
    //   onPress: (): void => props.navigation.navigate("AboutScreen", undefined),
    //   iconName: "info-outline",
    // }), [props.navigation])
    //
    // const rightIcon = useMemo((): HeaderIconProps => ({
    //   onPress: (): void => props.navigation.navigate("OptionsScreen", undefined),
    //   iconName: "settings",
    // }), [props.navigation])

    return (
        <Screen unsafe>
            <WorkoutsList />
        </Screen>
    )
}

export default HomeScreen
