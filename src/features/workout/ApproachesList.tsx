import {memo, ReactElement, useCallback} from "react";
import {FlatList, ListRenderItemInfo, StyleSheet, ViewStyle} from "react-native";

import ListLoader from "../../components/ListLoader";
import Span from "../../components/Span";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Exercise} from "../../store/exercises/types";
import {Workout} from "../../store/workouts/types";
import ApproachesListItem from "./ApproachesListItem";
import CurrentApproaches from "./CurrentApproaches";


type _Props = {
  readonly exerciseId: Exercise["id"],
  readonly workoutId: Workout["id"],
};

const container: ViewStyle = {
  width: layout.width,

  borderColor: "yellow",
  borderWidth: 2,
};

const staticStyles = StyleSheet.create({
  container,
});

function ApproachesList({exerciseId, workoutId}: _Props): ReactElement {
  const exerciseIds = useAppSelector(state => state.approaches.byExercise[exerciseId]);

  const keyExtractor = useCallback((id: Exercise["id"]): string => id, []);

  const renderItem = useCallback((data: ListRenderItemInfo<Exercise["id"]>) => (
    <ApproachesListItem id={data.item} />
  ), []);

  const headerComponent = useCallback(() => (
    <CurrentApproaches workoutId={workoutId} />
  ), [workoutId]);

  console.log({exerciseId});

  return (
    <FlatList
      inverted
      style={staticStyles.container}
      keyExtractor={keyExtractor}
      data={exerciseIds}
      ListEmptyComponent={(): ReactElement => (
        // TODO empty list
        <Span>exerciseId: {exerciseId}</Span>
      )}
      ListFooterComponent={ListLoader}
      ListHeaderComponent={headerComponent}
      renderItem={renderItem} />
  );
}

export default memo(ApproachesList);
