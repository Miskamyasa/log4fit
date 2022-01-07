import {memo, ReactElement, useCallback} from "react";
import {Alert, StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {isEmpty} from "lodash";

import {primaryColors, secondaryColors} from "../../colors";
import Div from "../../components/Div";
import PageTitle from "../../components/PageTitle";
import Span from "../../components/Span";
import {__locale, __t} from "../../i18";
import layout from "../../layout/constants";
import {navigation} from "../../navigation/config";
import {useAppDispatch, useAppSelector} from "../../store";
import {addExerciseToWorkoutAction} from "../../store/currentWorkout/actions";
import {addCustomExercise} from "../../store/exercises/actions";


const container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: layout.gap,
};

const card: ViewStyle = {
  width: "32%",
  borderRadius: layout.gap,
  overflow: "hidden",
  height: 62,
  paddingVertical: layout.gap,
  paddingHorizontal: layout.gap * 1.2,
  justifyContent: "center",
};

const text: TextStyle = {
  flex: 0,
  fontSize: 15,
};

const boldText: TextStyle = {
  ...text,
  fontWeight: "600",
};

const selectedText: TextStyle = {
  ...boldText,
  fontSize: 18,
};

const selected: ViewStyle = {
  ...container,
  ...card,
};

const staticStyles = StyleSheet.create({
  container,
  card,
  text,
  boldText,
  selectedText,
  selected,
});

function ExercisesListHeader(): ReactElement | null {
  const {workout, selectedExercise} = useAppSelector(state => state.currentWorkout);
  const store = useAppSelector(state => state.exercises.store);

  const dispatch = useAppDispatch();

  const handleStart = useCallback(() => {
    if (selectedExercise) {
      dispatch(addExerciseToWorkoutAction(selectedExercise));
    }
  }, [dispatch, selectedExercise]);

  const handleCreatePress = useCallback(() => {
    // FIXME doesn't work on android and sometimes blocks UI on ios
    Alert.prompt("text", "Введите название", (text): void => {
      if (text && text.length > 1) {
        dispatch(addCustomExercise(text));
      }
    }, "plain-text");
  }, [dispatch]);


  if (!workout || isEmpty(workout)) {
    navigation.replace("HomeScreen", undefined);
    return null;
  }

  return (
    <View>
      <View style={staticStyles.container}>
        <Div
          onPress={handleCreatePress}
          theme={primaryColors.background}
          style={staticStyles.card}>
          <Span
            lines={2}
            colorName={"alwaysWhite"}
            style={staticStyles.boldText}>
            {__t("exercises.create")}
          </Span>
        </Div>
        <Div
          theme={secondaryColors.background}
          style={staticStyles.card}>
          <Span
            style={staticStyles.text}
            lines={2}>
            {__t("exercises.selected")}
            {":\n"}
            {selectedExercise ? store[selectedExercise].title[__locale()] : "-"}
          </Span>
        </Div>
        <Div
          disabled={!selectedExercise}
          onPress={handleStart}
          theme={primaryColors.background}
          style={staticStyles.card}>
          <Span
            colorName={"alwaysWhite"}
            lines={2}
            style={staticStyles.boldText}>
            {__t("workoutScreen.addExercise")}
          </Span>
        </Div>
      </View>
      <PageTitle title={__t("exercises.title")} />
    </View>
  );
}

export default memo(ExercisesListHeader);
