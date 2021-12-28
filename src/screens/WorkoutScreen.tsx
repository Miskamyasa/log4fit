import {ReactElement} from "react";

import Header from "../components/Header";
import Screen from "../components/Screen";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";
import {useAppSelector} from "../store";


function WorkoutScreen({}: HomeStackScreenProps<"WorkoutScreen">): ReactElement {
  const workout = useAppSelector(state => state.currentWorkout);

  console.log({
    workout,
  });

  return (
    <Screen>
      <Header title={__t("workoutScreen.title")} />
    </Screen>
  );
}

export default WorkoutScreen;
