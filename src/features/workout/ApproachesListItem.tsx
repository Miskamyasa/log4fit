import {memo, ReactElement} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import ApproachCard from "../../components/ApproachCard";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Approach} from "../../store/approaches/types";


type _Props = {
  readonly id: Approach["id"],
};

const container: ViewStyle = {
  marginBottom: layout.gap / 2,
};

const staticStyles = StyleSheet.create({container});

function ApproachesListItem({id}: _Props): ReactElement | null {
  const data = useAppSelector(state => state.approaches.store[id]);

  const showWarmups = useAppSelector(state => state.common.showWarmups);

  if (!showWarmups && data.warmup) {
    return null;
  }

  return (
    <View style={staticStyles.container}>
      <ApproachCard
        {...data}
        counter={1} />
    </View>
  );
}

export default memo(ApproachesListItem);
