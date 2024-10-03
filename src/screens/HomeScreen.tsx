import {Screen} from "../components/Screen"
import {WorkoutsList} from "../features/workouts/WorkoutsList"
// import {HomeStackScreenProps} from "../navigation/types"

export function HomeScreen() {
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
        <Screen>
            <WorkoutsList />
        </Screen>
    )
}
