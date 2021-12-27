import {ReactElement} from "react";

import Header from "../components/Header";
import Screen from "../components/Screen";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";


function ExercisesScreen({}: HomeStackScreenProps<"ExercisesScreen">): ReactElement {
  return (
    <Screen>
      <Header title={__t("exercisesScreen.title")} />
    </Screen>
  );
}

export default ExercisesScreen;
