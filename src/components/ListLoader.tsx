import {memo, ReactElement} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import {useAppSelector} from "../store";
import Loader from "./Loader";


const container: ViewStyle = {
  marginBottom: 20,
};

const staticStyles = StyleSheet.create({container});

function ListLoader(): ReactElement {
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

export default memo(ListLoader);
