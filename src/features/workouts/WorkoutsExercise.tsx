import {createElement, memo, ReactElement, useMemo} from "react";
import {Image, ImageStyle, ScrollView, StyleSheet, View, ViewStyle} from "react-native";

import {isEmpty, reduce} from "lodash";

import ApproachCard from "../../components/ApproachCard";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Approach} from "../../store/approaches/types";
import {Exercise} from "../../store/exercises/types";


type _Props = {
  readonly id: Exercise["id"],
  readonly approaches: Approach[],
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

function WorkoutsExercise({id, approaches}: _Props): ReactElement {
  const exercise = useAppSelector(state => state.exercises.store[id]);

  const content = useMemo(() => {
    if (isEmpty(approaches)) {
      return [];
    }
    const [first, ...rest] = approaches;
    return reduce(rest, (acc, item, idx) => {
      const prev = acc[idx];
      if (prev.props.weight !== item.weight || prev.props.repeats !== item.repeats) {
        acc.push(
          createElement(ApproachCard, {key: idx, counter: 1, ...item})
        );
      } else {
        prev.props.counter += 1;
      }
      return acc;
    }, [
      createElement(ApproachCard, {key: 0, counter: 1, ...first}),
    ]);
  }, [approaches]);

  const Approaches = content.length > 1 ? ScrollView : View;

  return (
    <View style={staticStyles.container}>
      <Image
        style={staticStyles.icon}
        source={{uri: exercise?.icon}} />
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

export default memo(WorkoutsExercise);
