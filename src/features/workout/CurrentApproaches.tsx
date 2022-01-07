import {Fragment, memo, ReactElement, RefObject} from "react";
import {ScrollView, StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import EmptyCard from "../../components/EmptyCard";
import PageTitle from "../../components/PageTitle";
import Span from "../../components/Span";
import {__locale, __t} from "../../i18";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Exercise} from "../../store/exercises/types";
import AddApproachButton from "./AddApproachButton";
import AddExerciseButton from "./AddExerciseButton";


type _Props = {
  readonly exerciseId: Exercise["id"],
  readonly scrollRef: RefObject<ScrollView>,
};

const container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: layout.gap,
};

const currentApproaches: ViewStyle = {
  marginBottom: layout.gap,
};

const sessionTitle: TextStyle = {
  fontSize: 16,
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap,
};

const staticStyles = StyleSheet.create({
  container,
  currentApproaches,
  sessionTitle,
});

function CurrentApproaches({exerciseId, scrollRef}: _Props): ReactElement | null {
  const exercise = useAppSelector(state => state.exercises.store[exerciseId]);
  const approaches = useAppSelector(state => state.currentWorkout.approaches[exerciseId]);

  console.log({approaches});

  const lastWeight = approaches[approaches.length - 1].weight || 0;

  return (
    <Fragment>

      <View style={staticStyles.currentApproaches}>
        <Span style={staticStyles.sessionTitle}>{__t("workouts.sessionTitle")}</Span>
        {approaches ? (
          <Fragment>
            {/* TODO current approaches */}
          </Fragment>
        ) : (
          <EmptyCard />
        )}
      </View>

      <View style={staticStyles.container}>
        <AddExerciseButton scrollRef={scrollRef} />
        <AddApproachButton
          exerciseId={exerciseId}
          lastWeight={lastWeight} />
      </View>

      <PageTitle title={exercise.title[__locale()]} />

    </Fragment>
  );
}

export default memo(CurrentApproaches);
