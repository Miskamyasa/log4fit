import {memo, ReactElement, useCallback} from "react";
import {Image, ImageStyle, StyleSheet, TouchableOpacity, View, ViewStyle} from "react-native";

import {MaterialIcons} from "@expo/vector-icons";

import {useThemeColor} from "../../colors";
import Span from "../../components/Span";
import Toggle from "../../components/Toggle";
import {__locale} from "../../i18";
import layout from "../../layout/constants";
import {navigation} from "../../navigation/config";
import {useAppDispatch, useAppSelector} from "../../store";
import {toggleExerciseInWorkoutAction} from "../../store/currentWorkout/actions";
import {Exercise} from "../../store/exercises/types";


type Props = {
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
  icon,
  help,
});

const hitSlop = {left: 8, top: 8, right: 8, bottom: 8};

function ExerciseItem({id}: Props): ReactElement {
  const color = useThemeColor("text");
  
  const exercise = useAppSelector(state => state.exercises.store[id]);
  const workout = useAppSelector(state => state.currentWorkout.workout);

  const showInfoScreen = useCallback(() => {
    navigation.navigate("ExerciseInfoScreen", {id});
  }, [id]);

  const dispatch = useAppDispatch();
  const handleToggle = useCallback((): void => {
    dispatch(toggleExerciseInWorkoutAction(id));
  }, [dispatch, id]);

  return (
    <View style={staticStyles.container}>
      <Image
        style={staticStyles.icon}
        source={{uri: exercise?.icon}} />
      <TouchableOpacity
        style={staticStyles.help}
        onPress={showInfoScreen}
        hitSlop={hitSlop}>
        <MaterialIcons
          color={color}
          name={"help-outline"}
          size={20} />
      </TouchableOpacity>
      <Span size={16}>{exercise.title[__locale()]}</Span>
      <Toggle
        onToggle={handleToggle}
        defaultValue={workout?.exercises.includes(id)} />
    </View>
  );
}

export default memo(ExerciseItem);
