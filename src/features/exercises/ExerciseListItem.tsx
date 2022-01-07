import {memo, ReactElement, useCallback} from "react";
import {Image, ImageStyle, StyleSheet, TouchableOpacity, ViewStyle} from "react-native";

import {MaterialIcons} from "@expo/vector-icons";

import {useThemeColor} from "../../colors";
import Div from "../../components/Div";
import Span from "../../components/Span";
import {__locale} from "../../i18";
import layout from "../../layout/constants";
import {navigation} from "../../navigation/config";
import {useAppDispatch, useAppSelector} from "../../store";
import {toggleSelectExerciseAction} from "../../store/currentWorkout/actions";
import {Exercise} from "../../store/exercises/types";


type _Props = {
  readonly id: Exercise["id"],
};

const container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  overflow: "hidden",
  paddingVertical: layout.gap / 2,
  height: 36,
};

const selected: ViewStyle = {
  ...container,
  backgroundColor: "rgba(184,184,184, 0.2)",
};

const icon: ImageStyle = {
  zIndex: 2,
  width: 28,
  height: 28,
  overflow: "hidden",
  borderRadius: 6,
  marginLeft: layout.gap / 2,
  marginRight: layout.gap,
};

const help: ViewStyle = {
  marginRight: layout.gap,
};

const staticStyles = StyleSheet.create({
  container,
  selected,
  icon,
  help,
});

const hitSlop = {left: 8, top: 8, right: 8, bottom: 8};

function ExerciseListItem({id}: _Props): ReactElement {
  const color = useThemeColor("text");

  const exercise = useAppSelector(state => state.exercises.store[id]);

  const {workout, selectedExercise} = useAppSelector(state => state.currentWorkout);

  const showInfoScreen = useCallback(() => {
    navigation.navigate("ExerciseInfoScreen", {id});
  }, [id]);

  const dispatch = useAppDispatch();
  const handleToggle = useCallback((): void => {
    dispatch(toggleSelectExerciseAction(id));
  }, [dispatch, id]);

  return (
    <Div
      disabled={workout?.exercises.includes(id)}
      style={selectedExercise === id ? staticStyles.selected : staticStyles.container}
      onPress={handleToggle}>

      <Image
        style={staticStyles.icon}
        source={exercise.icon ? {uri: exercise.icon} : require("../../../assets/images/custom.png")} />

      <Span size={16}>{exercise.title[__locale()]}</Span>

      {exercise.category !== "custom" ? (
        <TouchableOpacity
          style={staticStyles.help}
          onPress={showInfoScreen}
          hitSlop={hitSlop}>
          <MaterialIcons
            color={color}
            name={"help-outline"}
            size={20} />
        </TouchableOpacity>
      ) : null}

    </Div>
  );
}

export default memo(ExerciseListItem);
