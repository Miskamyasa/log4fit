import {memo, ReactElement, useCallback, useMemo} from "react";
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {ThemeProps, useThemeColor} from "../../colors";
import Span from "../../components/Span";
import {__date, __day} from "../../i18";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Exercise} from "../../store/exercises/types";
import {Workout} from "../../store/workouts/types";
import WorkoutsListExercise from "./WorkoutsListExercise";


type _Props = {
  readonly id: Workout["id"],
};

const container: ViewStyle = {
  marginBottom: layout.gap,
};

const dateStyles: ViewStyle = {
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap,
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-between",
};

const content: ViewStyle = {
  marginBottom: layout.gap,
  borderRadius: 6,
  overflow: "hidden",
};

const day: TextStyle = {
  flex: 0,
};

const staticStyles = StyleSheet.create({
  container,
  dateStyles,
  day,
  content,
});

const colors: ThemeProps = {
  light: "#fefefe",
  dark: "rgba(14, 16, 18, 0.82)",
};

function WorkoutsListCard({id}: _Props): ReactElement {
  const {date: timestamp, exercises} = useAppSelector(state => state.workouts.store[id]);

  const backgroundColor = useThemeColor("viewBackground", colors);

  const contentStyle = useMemo(() => {
    return StyleSheet.compose(staticStyles.content, {backgroundColor});
  }, [backgroundColor]);

  const renderExercise = useCallback((exerciseId: Exercise["id"]) => {
    return (
      <WorkoutsListExercise
        key={exerciseId}
        id={exerciseId} />
    );
  }, []);

  const epoch = new Date(timestamp * 1000);

  return (
    <View style={staticStyles.container}>
      <View style={staticStyles.dateStyles}>
        <Span>{__date(epoch)}</Span>
        <Span style={staticStyles.day}>{__day(epoch)}</Span>
      </View>
      <View style={contentStyle}>
        {exercises.map(renderExercise)}
      </View>
    </View>

  );
}

export default memo(WorkoutsListCard);
