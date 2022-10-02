import {Fragment, memo, ReactElement, RefObject} from "react";
import {ScrollView, StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {get, map} from "lodash";

import ApproachCard from "../../components/ApproachCard";
import Div from "../../components/Div";
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

const content: ViewStyle = {
  marginBottom: layout.gap,
};

const approaches: ViewStyle = {
  borderRadius: layout.gap,
  overflow: "hidden",
};

const sessionTitle: TextStyle = {
  fontSize: 16,
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap,
};

const staticStyles = StyleSheet.create({
  container,
  content,
  approaches,
  sessionTitle,
});

function CurrentApproaches({exerciseId, scrollRef}: _Props): ReactElement | null {
  const exercise = useAppSelector(state => state.exercises.store[exerciseId]);
  const approaches = useAppSelector(state => state.currentWorkout.approaches[exerciseId]);

  const lastWeight = get(approaches, [approaches?.length - 1, "weight"], 0);

  return (
    <Fragment>

      <View style={staticStyles.content}>
        <Span style={staticStyles.sessionTitle}>{__t("workouts.sessionTitle")}</Span>
        <View style={staticStyles.approaches}>
          {approaches ? map(approaches, (item) => (
            <ApproachCard
              flex
              key={item.id}
              counter={1}
              {...item} />
          )) : (
            <EmptyCard />
          )}
        </View>
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
