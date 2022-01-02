import {memo, ReactElement} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import Loader from "../../components/Loader";
import {useAppSelector} from "../../store";


const container: ViewStyle = {
  marginBottom: 20,
};

const staticStyles = StyleSheet.create({container});

function WorkoutsListLoader(): ReactElement {
  const loading = useAppSelector(state => state.workouts.loading);
  const approachesLoading = useAppSelector(state => state.approaches.loading);

  return (
    <View style={staticStyles.container}>
      {loading || approachesLoading? (
        <Loader />
      ) : null}
    </View>
  );
}

export default memo(WorkoutsListLoader);
