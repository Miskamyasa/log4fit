import {ReactElement, useCallback} from "react";
import {ScrollView} from "react-native";

import {isEmpty} from "lodash";

import Header from "../components/Header";
import Screen from "../components/Screen";
import AddExerciseView from "../features/workout/AddExerciseView";
import ApproachesList from "../features/workout/ApproachesList";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";
import {useAppSelector} from "../store";
import {Exercise} from "../store/exercises/types";


function WorkoutScreen({}: HomeStackScreenProps<"WorkoutScreen">): ReactElement | null {
  const workout = useAppSelector(state => state.currentWorkout.workout);

  const renderExercise = useCallback((exerciseId: Exercise["id"]) => {
    if (!workout?.id) {
      return null;
    }
    return (
      <ApproachesList
        key={exerciseId}
        exerciseId={exerciseId}
        workoutId={workout.id} />
    );
  }, [workout?.id]);

  if (isEmpty(workout)) {
    return null;
  }

  return (
    <Screen unsafe>
      <Header title={__t("workoutScreen.title")} />
      {/* TODO TIMER */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{}}
        horizontal
        pagingEnabled>
        {workout?.exercises.map(renderExercise)}
        <AddExerciseView />
      </ScrollView>
    </Screen>
  );
}

export default WorkoutScreen;
