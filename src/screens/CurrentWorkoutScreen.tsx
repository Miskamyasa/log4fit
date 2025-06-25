import type {ReactElement} from "react"

import {type RouteProp, useRoute} from "@react-navigation/native"

import {AiMessage} from "../components/AiMessage"
import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
import {CurrentWorkout} from "../features/workout/CurrentWorkout"
import {__date, __t} from "../helpers/i18n"
import type {HomeStackParamList} from "../navigation/types"

export function CurrentWorkoutScreen(): ReactElement {
    const route = useRoute<RouteProp<HomeStackParamList, "CurrentWorkoutScreen">>()

    return (
        <Screen>
            <Header title={`${__t("workouts.screenTitle")}, ${__date(route.params.date)}`} />
            <AiMessage />
            {/* TODO - SUPER TIMER */}
            <CurrentWorkout />
        </Screen>
    )
}
