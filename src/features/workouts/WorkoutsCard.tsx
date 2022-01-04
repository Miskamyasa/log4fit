import {memo, ReactElement, useCallback, useMemo} from "react";
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {reduce} from "lodash";

import {ThemeProps, useThemeColor} from "../../colors";
import Span from "../../components/Span";
import {__date, __day} from "../../i18";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Approach} from "../../store/approaches/types";
import {Exercise} from "../../store/exercises/types";
import {Workout} from "../../store/workouts/types";
import WorkoutsExercise from "./WorkoutsExercise";


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

function WorkoutsCard({id}: _Props): ReactElement {
  const {date: timestamp, exercises} = useAppSelector(state => state.workouts.store[id]);

  const ids = useAppSelector(state => state.approaches.byWorkout[id]);
  const store = useAppSelector(state => state.approaches.store);

  // TODO condition in user options;
  const showWarmups = useAppSelector(state => state.common.showWarmups);

  const backgroundColor = useThemeColor("viewBackground", colors);

  const contentStyle = useMemo(() => {
    return StyleSheet.compose(staticStyles.content, {backgroundColor});
  }, [backgroundColor]);

  const renderExercise = useCallback((exerciseId: Exercise["id"], idx) => {
    const approaches = reduce<string, Approach[]>(ids, (acc, id) => {
      const approach = store[id];
      if (!showWarmups && approach.warmup) {
        return acc;
      }
      if (approach.exerciseId === exerciseId) {
        acc.push(approach);
      }
      return acc;
    }, []);
    return (
      <WorkoutsExercise
        key={exerciseId || String(idx)}
        approaches={approaches}
        id={exerciseId} />
    );
  }, [ids, store, showWarmups]);

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

export default memo(WorkoutsCard);
