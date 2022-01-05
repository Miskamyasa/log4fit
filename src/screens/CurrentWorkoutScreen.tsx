import {ReactElement, useCallback} from "react";
import {ScrollView} from "react-native";

import Header from "../components/Header";
import Screen from "../components/Screen";
import AddExerciseView from "../features/workout/AddExerciseView";
import ApproachesList from "../features/workout/ApproachesList";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";
import {useAppSelector} from "../store";
import {Exercise} from "../store/exercises/types";


function CurrentWorkoutScreen({}: HomeStackScreenProps<"CurrentWorkoutScreen">): ReactElement | null {
  const exercises = useAppSelector(state => state.currentWorkout.workout?.exercises);

  const renderExercise = useCallback((id: Exercise["id"]) => {
    return (
      <ApproachesList
        key={id}
        exerciseId={id} />
    );
  }, []);

  return (
    <Screen unsafe>
      <Header title={__t("workoutScreen.title")} />
      {/* TODO - SUPER TIMER */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled>
        {exercises?.map(renderExercise)}
        <AddExerciseView />
      </ScrollView>
    </Screen>
  );
}

export default CurrentWorkoutScreen;
