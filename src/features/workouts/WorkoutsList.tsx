import {memo, ReactElement, useCallback, useEffect} from "react";
import {FlatList, ListRenderItemInfo, StyleSheet, ViewStyle} from "react-native";

import layout from "../../layout/constants";
import {useAppDispatch, useAppSelector} from "../../store";
import {fetchWorkouts} from "../../store/workouts/actions";
import WorkoutsCard from "./WorkoutsCard";
import WorkoutsHeader from "./WorkoutsHeader";
import WorkoutsListLoader from "./WorkoutsListLoader";


const flatList: ViewStyle = {
  paddingTop: layout.iphoneX ? layout.xSafe : layout.gap,
  paddingHorizontal: layout.gap / 2,
};

const staticStyles = StyleSheet.create({flatList});

function WorkoutsList():ReactElement {
  const ids = useAppSelector(state => state.workouts.ids);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWorkouts());
    }, [dispatch]);

  const keyExtractor = useCallback((item: string, index): string => item || String(index), []);

  const renderItem = useCallback((data: ListRenderItemInfo<string>) => {
    return (
      <WorkoutsCard id={data.item} />
    );
  }, []);

  return (
    <FlatList
      style={staticStyles.flatList}
      ListFooterComponent={WorkoutsListLoader}
      ListHeaderComponent={WorkoutsHeader}
      inverted
      data={ids}
      keyExtractor={keyExtractor}
      renderItem={renderItem} />
  );
}

export default memo(WorkoutsList);
