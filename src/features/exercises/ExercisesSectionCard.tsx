import {memo, ReactElement, useCallback, useMemo} from "react";
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {isEmpty} from "lodash";

import {ThemeProps, useThemeColor} from "../../colors";
import Span from "../../components/Span";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Categories} from "../../store/exercises/types";
import ExerciseItem from "./ExerciseItem";


type _Props = {
  readonly title: string,
  readonly category: Categories,
};

const container: ViewStyle = {
  marginBottom: layout.gap / 2,
};

const title: TextStyle = {
  fontSize: 16,
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap,
};

const content: ViewStyle = {
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap,
  borderRadius: 6,
  overflow: "hidden",
};

const divider: ViewStyle = {
  height: 1,
  width: "100%",
};

const staticStyles = StyleSheet.create({
  container,
  title,
  content,
  divider,
});

const colors: ThemeProps = {
  light: "#fefefe",
  dark: "rgba(14, 16, 18, 0.82)",
};

function ExercisesSectionCard({title, category}: _Props): ReactElement | null {
  const ids = useAppSelector(state => state.exercises.ids[category]);
  const backgroundColor = useThemeColor("viewBackground", colors);
  const dividerColor = useThemeColor("dividerColor");

  const styles = useMemo(() => {
    return {
      content: StyleSheet.compose(staticStyles.content, {backgroundColor}),
      divider: StyleSheet.compose(staticStyles.divider, {backgroundColor: dividerColor}),
    };
  }, [backgroundColor, dividerColor]);

  const renderExercise = useCallback((exerciseId, idx) => {
    const item = (
      <ExerciseItem
        key={exerciseId}
        id={exerciseId} />
    );
    return idx > 0 ? (
      <View key={exerciseId}>
        <View style={styles.divider} />
        {item}
      </View>
    ) : item;
  }, [styles.divider]);

  if (isEmpty(ids)) {
    return null;
  }

  return (
    <View style={staticStyles.container}>
      <Span style={staticStyles.title}>{title}</Span>
      <View style={styles.content}>
        {ids.map(renderExercise)}
      </View>
    </View>
  );
}

export default memo(ExercisesSectionCard);
