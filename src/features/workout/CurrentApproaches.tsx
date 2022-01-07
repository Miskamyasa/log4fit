import {memo, ReactElement, useCallback} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import {primaryColors, secondaryColors} from "../../colors";
import Div from "../../components/Div";
import PageTitle from "../../components/PageTitle";
import Span from "../../components/Span";
import {__locale} from "../../i18";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Exercise} from "../../store/exercises/types";


type _Props = {
  readonly exerciseId: Exercise["id"],
};

const container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: layout.gap,
};

const card: ViewStyle = {
  width: (layout.width - (layout.gap * 1.5)) / 2,
  borderRadius: layout.gap,
  overflow: "hidden",
  height: 64,
};

const staticStyles = StyleSheet.create({
  container,
  card,
});

function CurrentApproaches({exerciseId}: _Props): ReactElement | null {
  const exercise = useAppSelector(state => state.exercises.store[exerciseId]);
  const approaches = useAppSelector(state => state.currentWorkout.approaches[exerciseId]);

  console.log({approaches});

  const openAddApproach = useCallback(() => {

  }, []);

  return (
    <View>
      <View style={staticStyles.container}>
        <Div
          style={staticStyles.card}
          theme={secondaryColors.background}>
          <Span>{"ADD_EXERCISE"}</Span>
        </Div>
        <Div
          style={staticStyles.card}
          theme={primaryColors.background}>
          <Span colorName={"alwaysWhite"}>{"ADD_APPROACH"}</Span>
        </Div>
      </View>
      {/*<Div*/}
      {/*  // disabled={!selectedExercise}*/}
      {/*  onPress={openAddApproach}*/}
      {/*  theme={primaryColors.background}*/}
      {/*  style={staticStyles.card}>*/}
      {/*  <Span*/}
      {/*    colorName={"alwaysWhite"}*/}
      {/*    lines={2}*/}
      {/*    style={staticStyles.boldText}>*/}
      {/*    {__t("workoutScreen.addExercise")}*/}
      {/*  </Span>*/}
      {/*</Div>*/}
      <PageTitle title={exercise.title[__locale()]} />
    </View>
  );
}

export default memo(CurrentApproaches);
