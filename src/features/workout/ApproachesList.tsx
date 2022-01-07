import {Fragment, memo, ReactElement, RefObject, useCallback} from "react";
import {FlatList, ListRenderItemInfo, ScrollView, StyleSheet, TextStyle, ViewStyle} from "react-native";

import {isEmpty} from "lodash";

import EmptyCard from "../../components/EmptyCard";
import ListLoader from "../../components/ListLoader";
import Span from "../../components/Span";
import {__t} from "../../i18";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Exercise} from "../../store/exercises/types";
import ApproachesListItem from "./ApproachesListItem";
import CurrentApproaches from "./CurrentApproaches";


type _Props = {
  readonly exerciseId: Exercise["id"],
  readonly scrollRef: RefObject<ScrollView>,
};

const flatList: ViewStyle = {
  paddingTop: layout.iphoneX ? layout.xSafe : layout.gap,
  paddingHorizontal: layout.gap / 2,
  width: layout.width,
};

const header: ViewStyle = {
  marginBottom: layout.gap,
};

const prevSessionTitle: TextStyle = {
  fontSize: 16,
  paddingHorizontal: layout.gap,
  marginBottom: layout.gap,
};

const staticStyles = StyleSheet.create({
  flatList,
  header,
  prevSessionTitle,
});

function ApproachesList({exerciseId, scrollRef}: _Props): ReactElement {
  const exerciseIds = useAppSelector(state => state.approaches.byExercise[exerciseId]);

  const keyExtractor = useCallback((id: Exercise["id"]): string => id, []);

  const renderItem = useCallback((data: ListRenderItemInfo<Exercise["id"]>) => (
    <ApproachesListItem id={data.item} />
  ), []);

  const headerComponent = useCallback(() => (
    <CurrentApproaches
      exerciseId={exerciseId}
      scrollRef={scrollRef} />
  ), [exerciseId, scrollRef]);

  const footerComponent = useCallback(() => (
    <Fragment>
      <ListLoader />
      <Span style={staticStyles.prevSessionTitle}>{__t("workouts.prevSessions")}</Span>
      {isEmpty(exerciseIds) ? (
        <EmptyCard />
      ) : null}
    </Fragment>
  ), [exerciseIds]);

  return (
    <FlatList
      inverted
      style={staticStyles.flatList}
      keyExtractor={keyExtractor}
      data={exerciseIds}
      ListFooterComponent={footerComponent}
      ListHeaderComponentStyle={staticStyles.header}
      ListHeaderComponent={headerComponent}
      renderItem={renderItem} />
  );
}

export default memo(ApproachesList);
