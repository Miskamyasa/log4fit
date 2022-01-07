import {memo, ReactElement, useCallback} from "react";
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {secondaryColors} from "../../colors";
import Div from "../../components/Div";
import OverlayLoader from "../../components/OverlayLoader";
import Span from "../../components/Span";
import {__locale, __t} from "../../i18";
import layout from "../../layout/constants";
import {useAppDispatch, useAppSelector} from "../../store";
import {startWorkout} from "../../store/currentWorkout/actions";
import {Exercise} from "../../store/exercises/types";


const container: ViewStyle = {
  overflow: "hidden",
  borderRadius: layout.gap,
  height: 125,
};

const content: ViewStyle = {
  flex: 1,
  paddingVertical: layout.gap,
  paddingHorizontal: layout.gap + 4,
};

const leftSide: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const rightSide: ViewStyle = {
  flex: 1.5,
  justifyContent: "flex-end",
  alignItems: "flex-end",
};

const exercisesTitles: TextStyle = {
  textAlign: "right",
  flex: 0,
  fontSize: 15,
};

const staticStyles = StyleSheet.create({
  container,
  content,
  leftSide,
  rightSide,
  exercisesTitles,
});

function WorkoutsListHeader(): ReactElement {
  const {workout, loading} = useAppSelector(state => state.currentWorkout);
  const exercisesStore = useAppSelector(state => state.exercises.store);

  const dispatch = useAppDispatch();
  const handlePress = useCallback(() => {
    dispatch(startWorkout(workout?.id));
  }, [workout, dispatch]);

  const getExerciseTitle = useCallback((id: Exercise["id"]) => {
    return exercisesStore[id].title[__locale()];
  }, [exercisesStore]);

  const titles = workout?.exercises
    ? workout.exercises
      .slice(0,3)
      .map(getExerciseTitle)
      .join("\n")
    : "";

  return (
    <Div
      onPress={handlePress}
      theme={secondaryColors.background}
      style={staticStyles.container}>

      {loading ? (
        <OverlayLoader />
      ) : null}

      <View style={staticStyles.content}>

        <View style={staticStyles.leftSide}>
          <Span
            theme={secondaryColors.color}
            weight="600"
            size={24}>
            {__t(workout?.id ? "workouts.continueWorkout" : "workouts.startWorkout")}
          </Span>
        </View>

        <View style={staticStyles.rightSide}>
          {workout?.exercises ? (
            <Span
              style={staticStyles.exercisesTitles}
              lines={3}>
              {titles}
              {/*
                FIXME maybe add this - {workout?.exercises.length > 3 ? ` + ${workout?.exercises.length - 3}` : ""}
              */}
            </Span>
          ) : null}
        </View>

      </View>

    </Div>
  );
}

export default memo(WorkoutsListHeader);
