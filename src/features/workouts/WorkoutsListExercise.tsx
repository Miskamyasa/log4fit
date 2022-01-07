import {createElement, memo, ReactElement, useMemo} from "react";
import {Image, ImageStyle, ScrollView, StyleSheet, View, ViewStyle} from "react-native";

import {isEmpty, reduce} from "lodash";

import ApproachCard from "../../components/ApproachCard";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Exercise} from "../../store/exercises/types";


type _Props = {
  readonly id: Exercise["id"],
};

const container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  overflow: "hidden",
  paddingTop: layout.gap / 2,
  marginBottom: layout.gap / 2,
};

const icon: ImageStyle = {
  zIndex: 2,
  width: 36,
  height: 36,
  overflow: "hidden",
  borderRadius: 8,
  marginLeft: layout.gap / 2,
};

const content: ViewStyle = {
  height: 36,
  flex: 1,
  borderRadius: 8,
  overflow: "hidden",
};

const staticStyles = StyleSheet.create({container, icon, content});

function WorkoutsListExercise({id}: _Props): ReactElement {
  const exercise = useAppSelector(state => state.exercises.store[id]);

  const ids = useAppSelector(state => state.approaches.byExercise[id]);
  const store = useAppSelector(state => state.approaches.store);

  // TODO condition in user options;
  const showWarmups = useAppSelector(state => state.common.showWarmups);

  const content = useMemo(() => {
    if (isEmpty(ids)) {
      return [];
    }
    const [firstId, ...rest] = ids;
    return reduce(rest, (acc, approachId, idx) => {
      const item = store[approachId];
      if (!showWarmups && item.warmup) {
        return acc;
      }
      const prev = acc[idx];
      if (prev.props.weight !== item.weight || prev.props.repeats !== item.repeats) {
        acc.push(
          createElement(ApproachCard, {key: idx + 1, counter: 1, ...item})
        );
      } else {
        prev.props.counter += 1;
      }
      return acc;
    }, [
      createElement(ApproachCard, {key: 0, counter: 1, ...store[firstId]}),
    ]);
  }, [showWarmups, ids, store]);

  const Approaches = content.length > 1 ? ScrollView : View;

  return (
    <View style={staticStyles.container}>
      <Image
        style={staticStyles.icon}
        source={exercise.icon ? {uri: exercise.icon} : require("../../../assets/images/adaptive-icon.png")} />
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
