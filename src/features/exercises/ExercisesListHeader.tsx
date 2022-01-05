import {memo, ReactElement, useCallback, useEffect} from "react";
import {Alert, StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {isEmpty, min} from "lodash";

import {primaryColors, ThemeProps} from "../../colors";
import Div from "../../components/Div";
import Span from "../../components/Span";
import {__t} from "../../i18";
import layout from "../../layout/constants";
import {navigation} from "../../navigation/config";
import {useAppDispatch, useAppSelector} from "../../store";
import {addCustomExercise} from "../../store/exercises/actions";


const container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const card: ViewStyle = {
  width: "32%",
  overflow: "hidden",
  borderRadius: layout.gap,
  height: 64,
  paddingVertical: layout.gap,
  paddingHorizontal: layout.gap * 1.3,
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

const selectedColors: ThemeProps = {
  light: "rgba(210, 220, 230, 0.82)",
  dark: "rgba(29, 33, 37, 0.7)",
};

function ExercisesListHeader(): ReactElement | null {
  const workout = useAppSelector(state => state.currentWorkout.workout);

  const handleStart = useCallback(() => {
    navigation.replace("CurrentWorkoutScreen", undefined);
  }, []);

  const dispatch = useAppDispatch();

  const handleCreatePress = useCallback(() => {
    // FIXME doesn't work on android and sometimes blocks UI on ios
    Alert.prompt("text", "Введите название", (text): void => {
      if (text && text.length > 1) {
        dispatch(addCustomExercise(text));
      }
    }, "plain-text");
  }, [dispatch]);

  useEffect(() => {
    if (!workout || isEmpty(workout)) {
      navigation.replace("HomeScreen", undefined);
    }
  }, [workout]);

  if (!workout || isEmpty(workout)) {
    return null;
  }

  const len = Object.values(workout.exercises).length;

  return (
    <View style={staticStyles.container}>
      <Div
        onPress={handleCreatePress}
        theme={primaryColors.background}
        style={staticStyles.card}>
        <Span
          lines={2}
          colorName={"alwaysWhite"}
          style={staticStyles.boldText}>
          {__t("exercisesScreen.create")}
        </Span>
      </Div>
      <Div
        theme={selectedColors}
        style={staticStyles.card}>
        <Span style={staticStyles.text}>
          {__t("exercisesScreen.selected")}
        </Span>
        <Span style={staticStyles.selectedText}>
          {min([len, 99])}
        </Span>
      </Div>
      <Div
        disabled={!len}
        onPress={handleStart}
        theme={primaryColors.background}
        style={staticStyles.card}>
        <Span
          colorName={"alwaysWhite"}
          lines={2}
          style={staticStyles.boldText}>
          {__t("workouts.startWorkout")}
        </Span>
      </Div>
    </View>
  );
}

export default memo(ExercisesListHeader);
