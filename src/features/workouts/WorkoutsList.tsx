import {memo, ReactElement, useCallback} from "react";
import {FlatList, ListRenderItemInfo, StyleSheet, ViewStyle} from "react-native";

import {isEmpty} from "lodash";

import EmptyCard from "../../components/EmptyCard";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";

import WorkoutsListCard from "./WorkoutsListCard";
import WorkoutsListHeader from "./WorkoutsListHeader";


const flatList: ViewStyle = {
  paddingTop: layout.iphoneX ? layout.xSafe : layout.gap,
  paddingHorizontal: layout.gap / 2,
};

const staticStyles = StyleSheet.create({flatList});

function WorkoutsList(): ReactElement {
  const ids = useAppSelector(state => state.workouts.ids);

  const renderItem = useCallback((data: ListRenderItemInfo<string>) => {
    return (
      <WorkoutsListCard id={data.item} />
    );
  }, []);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      style={staticStyles.flatList}
      ListFooterComponent={isEmpty(ids) ? <EmptyCard /> : null}
      ListHeaderComponent={WorkoutsListHeader}
      inverted
      data={ids}
      renderItem={renderItem} />
  );
}

export default memo(WorkoutsList);
