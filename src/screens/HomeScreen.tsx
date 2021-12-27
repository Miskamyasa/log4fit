import {ReactElement, useCallback, useEffect, useMemo} from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  ViewStyle,
} from "react-native";

import Header, {HeaderIconProps} from "../components/Header";
import Loader from "../components/Loader";
import Screen from "../components/Screen";
import Span from "../components/Span";
import WorkoutsCard from "../components/WorkoutsCard";
import WorkoutsSeparator from "../components/WorkoutsSeparator";
import GotoWorkout from "../features/GotoWorkout";
import {__t} from "../i18";
import layout from "../layout/constants";
import {HomeStackScreenProps} from "../navigation/types";
import {useAppDispatch, useAppSelector} from "../store";
import {fetchExercises} from "../store/exercises/actions";
import {WorkoutsListItem} from "../store/workouts/types";


const flatList: ViewStyle = {
  paddingTop: layout.iphoneX ? layout.xSafe : layout.gap + 4,
};

const staticStyles = StyleSheet.create({
  flatList,
});

function HomeScreen({navigation}: HomeStackScreenProps<"HomeScreen">): ReactElement {
  const dispatch = useAppDispatch();
  const list = useAppSelector(state => state.workouts.list);

  useEffect(() => {
    dispatch(fetchExercises());
    // async function makeCall(): Promise<void> {
    //   const res = await getCollection<ExercisesListItem>("exercises");
    //   console.log({
    //     res,
    //   });
    // }
  }, []);

  const leftIcon = useMemo((): HeaderIconProps => ({
    onPress: (): void => navigation.navigate("AboutScreen"),
    iconName: "info-outline",
  }), [navigation]);

  const rightIcon = useMemo((): HeaderIconProps => ({
    onPress: (): void => navigation.navigate("OptionsScreen"),
    iconName: "settings",
  }), [navigation]);

  const keyExtractor = useCallback((item: WorkoutsListItem, index): string => {
    return item.id || String(index);
  }, []);

  const renderItem = useCallback((data: ListRenderItemInfo<WorkoutsListItem>) => {
    return (
      <WorkoutsCard>
        <Span>{data.item.id}</Span>
      </WorkoutsCard>
    );
  }, []);

  return (
    <Screen unsafe>
      <Header
        title={__t("homeScreen.title")}
        leftIcon={leftIcon}
        rightIcon={rightIcon} />
      <FlatList
        style={staticStyles.flatList}
        // ListFooterComponent={Loader}
        ItemSeparatorComponent={WorkoutsSeparator}
        ListHeaderComponent={GotoWorkout}
        inverted
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem} />
    </Screen>
  );
}

export default HomeScreen;
