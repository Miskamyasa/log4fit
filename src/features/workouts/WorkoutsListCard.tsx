import {memo, ReactElement, useCallback, useMemo} from "react";
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {chain, isEmpty, reduce} from "lodash";

import {ThemeProps, useThemeColor} from "../../colors";
import Span from "../../components/Span";
import {__date, __day} from "../../i18";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Approach} from "../../store/approaches/types";
import {Workout, WorkoutExercise} from "../../store/workouts/types";
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

  const ids = useAppSelector(state => state.approaches.byWorkout[id]);
  const store = useAppSelector(state => state.approaches.store);

  // TODO condition in user options;
  const showWarmups = useAppSelector(state => state.common.showWarmups);

  const backgroundColor = useThemeColor("viewBackground", colors);

  const contentStyle = useMemo(() => {
    return StyleSheet.compose(staticStyles.content, {backgroundColor});
  }, [backgroundColor]);

  const renderExercise = useCallback(({id: exerciseId, approaches: ids}: WorkoutExercise, idx) => {
    const approaches = reduce<string, Approach[]>(ids, (acc, id) => {
      const approach = store[id];
      if (!showWarmups && approach.warmup) {
        return acc;
      }
      acc.push(approach);
      return acc;
    }, []);
    return (
      <WorkoutsListExercise
        key={exerciseId || idx}
        approaches={approaches}
        id={exerciseId} />
    );
  }, [ids, store, showWarmups]);

  const epoch = new Date(timestamp * 1000);

  const items = chain(exercises)
    .reject((item) => isEmpty(item.approaches))
    // .sortBy("order") // TODO ordering
    .map(renderExercise)
    .value();

  return (
    <View style={staticStyles.container}>
      <View style={staticStyles.dateStyles}>
        <Span>{__date(epoch)}</Span>
        <Span style={staticStyles.day}>{__day(epoch)}</Span>
      </View>
      <View style={contentStyle}>
        {items}
      </View>
    </View>

  );
}

export default memo(WorkoutsListCard);
