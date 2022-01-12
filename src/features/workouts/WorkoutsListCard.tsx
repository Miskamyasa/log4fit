import {memo, ReactElement, useCallback, useMemo} from "react";
import {Alert, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";

import {MaterialIcons} from "@expo/vector-icons";
import * as Updates from "expo-updates";

import {secondaryColors, ThemeProps, useThemeColor} from "../../colors";
import Div from "../../components/Div";
import Span from "../../components/Span";
import {__date, __day, __t} from "../../i18";
import layout from "../../layout/constants";
import {useAppDispatch, useAppSelector} from "../../store";
import {startWorkout} from "../../store/currentWorkout/actions";
import {Exercise} from "../../store/exercises/types";
import {Workout} from "../../store/workouts/types";
import WorkoutsListExercise from "./WorkoutsListExercise";


type _Props = {
  readonly id: Workout["id"],
};

const container: ViewStyle = {
  marginBottom: layout.gap,
};

const row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const header: ViewStyle = {
  ...row,
  paddingHorizontal: layout.gap,
  paddingTop: layout.gap,
};

const content: ViewStyle = {
  marginBottom: layout.gap,
  paddingBottom: layout.gap / 2,
  minHeight: layout.gap,
  borderRadius: layout.gap,
  overflow: "hidden",
};

const day: TextStyle = {
  marginRight: layout.gap,
};

const staticStyles = StyleSheet.create({
  container,
  row,
  header,
  day,
  content,
});

const colors: ThemeProps = {
  light: "#fcfcfe",
  dark: "rgba(14, 16, 18, 0.82)",
};

function WorkoutsListCard({id}: _Props): ReactElement | null {
  const {date: timestamp, exercises} = useAppSelector(state => state.workouts.store[id]);
  const currentWorkoutId = useAppSelector(state => state.currentWorkout.workout?.id);

  const backgroundColor = useThemeColor("viewBackground", colors);
  const dimmedBackground = useThemeColor("dimmedBackground");
  const textColor = useThemeColor("text");

  const style = useMemo(() => {
    return {
      list: StyleSheet.compose(staticStyles.content, {backgroundColor}),
      current: StyleSheet.compose(staticStyles.content, {backgroundColor: dimmedBackground}),
    };
  }, [backgroundColor, dimmedBackground]);

  const renderExercise = useCallback((exerciseId: Exercise["id"]) => {
    return (
      <WorkoutsListExercise
        key={exerciseId}
        id={exerciseId} />
    );
  }, []);

  const dispatch = useAppDispatch();

  const continueWorkout = useCallback(() => {
    Alert.alert(__t("workouts.return"), "", [
      {text: __t("cancel")},
      {text: __t("continue"), onPress: (): void => { dispatch(startWorkout(id)); }},
    ], {cancelable: false});
  }, [id, dispatch]);

  const epoch = new Date(timestamp);

  return (
    <View style={id == currentWorkoutId ? style.current : style.list}>

      <View style={staticStyles.header}>

        <View style={staticStyles.row}>
          <Span style={staticStyles.day}>{__day(epoch)}</Span>
          <Span>{__date(epoch)}</Span>
        </View>

        <TouchableOpacity
          hitSlop={layout.hitSlop}
          onPress={continueWorkout}>
          <MaterialIcons
            name="exit-to-app"
            size={20}
            color={textColor} />
        </TouchableOpacity>

      </View>

      {exercises.map(renderExercise)}

    </View>
  );
}

export default memo(WorkoutsListCard);
