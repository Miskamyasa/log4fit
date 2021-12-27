import {ReactElement} from "react";

import Header from "../components/Header";
import Screen from "../components/Screen";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";


function WorkoutScreen({}: HomeStackScreenProps<"WorkoutScreen">): ReactElement {
  return (
    <Screen>
      <Header title={__t("workoutScreen.title")} />
    </Screen>
  );
}

export default WorkoutScreen;
