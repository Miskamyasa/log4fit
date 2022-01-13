import {memo, ReactElement, useMemo} from "react";
import {Image, ImageStyle, ScrollView, StyleSheet, View, ViewStyle} from "react-native";

import {isEmpty, reduce} from "lodash";

import ApproachCard from "../../components/ApproachCard";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Exercise} from "../../store/exercises/types";
import {Workout} from "../../store/workouts/types";


type _Props = {
  readonly id: Exercise["id"],
  readonly workoutId: Workout["id"],
};

const container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  overflow: "hidden",
  paddingTop: layout.gap / 2,
};

const icon: ImageStyle = {
  zIndex: 2,
  width: 32,
  height: 32,
  overflow: "hidden",
  borderRadius: 8,
  marginLeft: layout.gap / 2,
  marginRight: layout.gap / 2,
};

const content: ViewStyle = {
  height: 36,
  flex: 1,
  borderRadius: 8,
  overflow: "hidden",
  marginRight: layout.gap / 2,
};

const staticStyles = StyleSheet.create({container, icon, content});

function WorkoutsListExercise({id, workoutId}: _Props): ReactElement | null {
  const exercise = useAppSelector(state => state.exercises.store[id]);

  if (!exercise) {
    return null;
  }

  const store = useAppSelector(state => state.approaches.store);
  const ids = useAppSelector(state => state.approaches.byWorkout[workoutId]);

  // TODO condition in user options;
  const showWarmups = useAppSelector(state => state.common.showWarmups);

  const content = useMemo(() => {
    if (isEmpty(ids)) {
      return [];
    }
    const [firstId, ...rest] = ids;
    return reduce(rest, (acc, id) => {
      const curr = store[id];
      if (curr.exerciseId !== exercise.id || (!showWarmups && curr.warmup)) {
        return acc;
      }
      const prev = acc.pop();
      if (prev) {
        if (prev.weight !== curr.weight || prev.repeats !== curr.repeats) {
          acc.push(prev, {...curr, counter: 1});
        } else {
          acc.push({...prev, counter: prev.counter + 1});
        }
      }
      return acc;
    }, [{counter: 1, ...store[firstId]}])
      .map((item, idx, arr) => (
        <ApproachCard
          scrollable={arr.length > idx}
          first={idx === 0}
          last={idx === arr.length - 1}
          key={item.id}
          {...item} />
      ));
  }, [ids, store, exercise.id, showWarmups]);

  const Approaches = content.length > 1 ? ScrollView : View;

  return (
    <View style={staticStyles.container}>

      <Image
        style={staticStyles.icon}
        source={exercise.icon ? {uri: exercise.icon} : require("../../../assets/images/custom.png")} />

      <Approaches
        style={staticStyles.content}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal>
        {content}
      </Approaches>

    </View>
  );
}

export default memo(WorkoutsListExercise);
