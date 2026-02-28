
import {AiMessage} from "../components/AiMessage"
import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
import {CurrentWorkout} from "../features/workout/CurrentWorkout"
import {__date, __t} from "../helpers/i18n"
import {useParams} from "../navigation/useParams"

export function CurrentWorkoutScreen() {
  const params = useParams<"CurrentWorkoutScreen">()

  return (
    <Screen>
      <Header title={`${__t("workouts.screenTitle")}, ${__date(params.date)}`} />
      <AiMessage />
      {/* TODO - SUPER TIMER */}
      <CurrentWorkout />
    </Screen>
  )
}
