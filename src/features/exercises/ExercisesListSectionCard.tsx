import {memo, ReactElement, useCallback, useMemo} from "react";
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {isEmpty} from "lodash";

import {ThemeProps, useThemeColor} from "../../colors";
import Divider from "../../components/Divider";
import Span from "../../components/Span";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Categories} from "../../store/exercises/types";
import ExerciseListItem from "./ExerciseListItem";


type _Props = {
  readonly title: string,
  readonly category: Categories,
};

const container: ViewStyle = {
  marginBottom: layout.gap,
};

const title: TextStyle = {
  fontSize: 16,
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap,
};

const content: ViewStyle = {
  marginBottom: layout.gap,
  borderRadius: 6,
  overflow: "hidden",
};

const staticStyles = StyleSheet.create({
  container,
  title,
  content,
});

const colors: ThemeProps = {
  light: "#fefefe",
  dark: "rgba(14, 16, 18, 0.82)",
};

function ExercisesListSectionCard({title, category}: _Props): ReactElement | null {
  const ids = useAppSelector(state => state.exercises.ids[category]);
  const backgroundColor = useThemeColor("buttonBackground", colors);

  const contentStyles = useMemo(() => {
    return StyleSheet.compose(staticStyles.content, {backgroundColor});
  }, [backgroundColor]);

  const renderExercise = useCallback((exerciseId, idx) => {
    const item = (
      <ExerciseListItem
        key={exerciseId}
        id={exerciseId} />
    );
    return idx > 0 ? (
      <View key={exerciseId}>
        <Divider />
        {item}
      </View>
    ) : item;
  }, []);

  if (isEmpty(ids)) {
    return null;
  }

  return (
    <View style={staticStyles.container}>
      <Span style={staticStyles.title}>{title}</Span>
      <View style={contentStyles}>
        {ids.map(renderExercise)}
      </View>
    </View>
  );
}

export default memo(ExercisesListSectionCard);
