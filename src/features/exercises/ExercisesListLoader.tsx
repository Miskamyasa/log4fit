import {memo, ReactElement} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import Loader from "../../components/Loader";
import {useAppSelector} from "../../store";


const container: ViewStyle = {
  marginBottom: 20,
};

const staticStyles = StyleSheet.create({container});

function ExercisesListLoader(): ReactElement {
  const loading = useAppSelector(state => state.exercises.loading);

  return (
    <View style={staticStyles.container}>
      {loading ? (
        <Loader />
      ) : null}
    </View>
  );
}

export default memo(ExercisesListLoader);
