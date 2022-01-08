import {memo, ReactElement, useMemo} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import {useThemeColor} from "../../colors";
import ApproachCard from "../../components/ApproachCard";
import layout from "../../layout/constants";
import {useAppSelector} from "../../store";
import {Approach} from "../../store/approaches/types";


type _Props = {
  readonly id: Approach["id"],
};

const container: ViewStyle = {
  marginBottom: layout.gap,
  borderRadius: 4,
  overflow: "hidden",
};

const staticStyles = StyleSheet.create({container});

function ApproachesListItem({id}: _Props): ReactElement | null {
  const data = useAppSelector(state => state.approaches.store[id]);

  const backgroundColor = useThemeColor("viewBackground");
  const styles = useMemo(() => {
    return StyleSheet.flatten([staticStyles.container, {backgroundColor}]);
  }, [backgroundColor]);

  const showWarmups = useAppSelector(state => state.common.showWarmups);

  if (!showWarmups && data.warmup) {
    return null;
  }

  return (
    <View style={styles}>
      <ApproachCard
        {...data}
        flex
        counter={1} />
    </View>
  );
}

export default memo(ApproachesListItem);
