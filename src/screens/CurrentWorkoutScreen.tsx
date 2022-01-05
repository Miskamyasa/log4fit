import {ReactElement, useCallback} from "react";
import {ScrollView} from "react-native";

import {isEmpty, map, mapKeys} from "lodash";

import Header from "../components/Header";
import Screen from "../components/Screen";
import AddExerciseView from "../features/workout/AddExerciseView";
import ApproachesList from "../features/workout/ApproachesList";
import {__t} from "../i18";
import {HomeStackScreenProps} from "../navigation/types";
import {useAppSelector} from "../store";
import {WorkoutExercise} from "../store/workouts/types";


function CurrentWorkoutScreen({}: HomeStackScreenProps<"CurrentWorkoutScreen">): ReactElement | null {
  const workout = useAppSelector(state => state.currentWorkout.workout);

  const renderExercise = useCallback(({id}: WorkoutExercise) => {
    if (!workout?.id) {
      return null;
    }
    return (
      <ApproachesList
        key={id}
        exerciseId={id}
        workoutId={workout.id} />
    );
  }, [workout?.id]);

  if (!workout || isEmpty(workout)) {
    return null;
  }

  return (
    <Screen unsafe>
      <Header title={__t("workoutScreen.title")} />
      {/* TODO - SUPER TIMER */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled>
        {map(workout.exercises, renderExercise)}
        <AddExerciseView />
      </ScrollView>
    </Screen>
  );
}

export default CurrentWorkoutScreen;
