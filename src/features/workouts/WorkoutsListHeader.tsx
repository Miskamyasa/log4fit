import {memo, ReactElement, useCallback} from "react";
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {primaryColors, secondaryColors} from "../../colors";
import Div from "../../components/Div";
import OverlayLoader from "../../components/OverlayLoader";
import Span from "../../components/Span";
import {__locale, __t} from "../../i18";
import layout from "../../layout/constants";
import {navigation} from "../../navigation/config";
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

const topContent: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const bottomContent: ViewStyle = {
  flex: 1.5,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: layout.gap / 2 + 1,
};

const exercisesTitles: TextStyle = {
  textAlign: "right",
  fontSize: 15,
};

const createNew: ViewStyle = {
  borderRadius: layout.gap,
  overflow: "hidden",
  height: 40,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: layout.gap * 2,
};

const staticStyles = StyleSheet.create({
  container,
  content,
  topContent,
  bottomContent,
  exercisesTitles,
  createNew,
});

function WorkoutsListHeader(): ReactElement {
  const {workout, loading} = useAppSelector(state => state.currentWorkout);
  const exercisesStore = useAppSelector(state => state.exercises.store);

  const dispatch = useAppDispatch();

  const createNewWorkout = useCallback(() => {
    dispatch(startWorkout());
  }, [dispatch]);

  const continueWorkout = useCallback(() => {
    navigation.navigate("CurrentWorkoutScreen", undefined);
  }, []);

  const getExerciseTitle = useCallback((id: Exercise["id"]) => {
    return exercisesStore[id].title[__locale()];
  }, [exercisesStore]);

  return (
    <Div
      onPress={workout?.id ? continueWorkout : createNewWorkout}
      theme={secondaryColors.background}
      style={staticStyles.container}>

      {loading ? (
        <OverlayLoader />
      ) : null}

      <View style={staticStyles.content}>

        <View style={staticStyles.topContent}>
          <Span
            theme={secondaryColors.color}
            weight="600"
            flex
            lines={1}
            size={24}>
            {__t(workout?.id ? "workouts.continueWorkout" : "workouts.startWorkout")}
          </Span>
        </View>

        <View style={staticStyles.bottomContent}>
          {workout?.id ? (
            <Div
              onPress={createNewWorkout}
              theme={primaryColors.background}
              style={staticStyles.createNew}>
              <Span colorName={"alwaysWhite"}>
                {__t("workouts.createNew")}
              </Span>
            </Div>
          ) : null}

          {workout?.exercises ? (
            <Span
              style={staticStyles.exercisesTitles}
              lines={3}>
              {workout?.exercises ? workout.exercises.slice(0,2).map(getExerciseTitle).join("\n") : ""}
              {/*{workout?.exercises.length > 2 ? `\n + ${workout?.exercises.length - 2}` : ""}*/}
            </Span>
          ) : null}
        </View>

      </View>

    </Div>
  );
}

export default memo(WorkoutsListHeader);
