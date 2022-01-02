import {ReactElement} from "react";

import Header from "../components/Header";
import Screen from "../components/Screen";
import ExercisesList from "../features/exercises/ExercisesList";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";


function ExercisesScreen({}: HomeStackScreenProps<"ExercisesScreen">): ReactElement {
  return (
    <Screen unsafe>
      <Header title={__t("exercisesScreen.title")} />
      <ExercisesList />
    </Screen>
  );
}

export default ExercisesScreen;
