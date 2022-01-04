import {memo, ReactElement, useCallback} from "react";
import {ListRenderItemInfo, FlatList, StyleSheet, ViewStyle} from "react-native";

import {__t} from "../../i18";
import layout from "../../layout/constants";
import {Categories} from "../../store/exercises/types";
import ExercisesHeader from "./ExercisesHeader";
import ExercisesListLoader from "./ExercisesListLoader";
import ExercisesSectionCard from "./ExercisesSectionCard";


const flatList: ViewStyle = {
  paddingTop: layout.iphoneX ? layout.xSafe : layout.gap,
  paddingHorizontal: layout.gap / 2,
};

const staticStyles = StyleSheet.create({flatList});

type ExercisesSection = {
  key: Categories,
  title: string,
};

const sections: Array<ExercisesSection> = [
  {key: "custom", title: __t("exercisesScreen.sections.custom")},
  {key: "base", title: __t("exercisesScreen.sections.base")},
  {key: "other", title: __t("exercisesScreen.sections.other")},
];

function ExercisesList(): ReactElement {
  const keyExtractor = useCallback((item: ExercisesSection, index): string => item.key || String(index), []);

  const renderItem = useCallback(({item}: ListRenderItemInfo<ExercisesSection>) => (
    <ExercisesSectionCard
      category={item.key}
      title={item.title} />
  ), []);

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      style={staticStyles.flatList}
      inverted
      ListFooterComponent={ExercisesListLoader}
      ListHeaderComponent={ExercisesHeader}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={sections} />
  );
}

export default memo(ExercisesList);
