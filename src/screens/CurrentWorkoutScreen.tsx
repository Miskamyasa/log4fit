import {ReactElement, useCallback, useRef} from "react";
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

  const scrollRef = useRef<ScrollView>(null);

  const renderExercise = useCallback((id: Exercise["id"]) => {
    return (
      <ApproachesList
        key={id}
        scrollRef={scrollRef}
        exerciseId={id} />
    );
  }, []);

  const flashIndicator = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.flashScrollIndicators();
    }
  }, []);

  return (
    <Screen unsafe>
      <Header title={__t("workouts.screenTitle")} />

      {/* TODO - SUPER TIMER */}

      <ScrollView
        onContentSizeChange={flashIndicator}
        pinchGestureEnabled={false}
        scrollsToTop={false}
        ref={scrollRef}
        // showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled>

        {exercises?.map(renderExercise)}

        <AddExerciseView />

      </ScrollView>

    </Screen>
  );
}

export default CurrentWorkoutScreen;
