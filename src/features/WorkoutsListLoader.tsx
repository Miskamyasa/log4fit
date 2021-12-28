import {ReactElement} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import Loader from "../components/Loader";
import layout from "../layout/constants";
import {useAppSelector} from "../store";


const container: ViewStyle = {
  ...layout.listContentItem,
  height: 50,
  borderWidth: 1,
  borderColor: "#eee",
  marginBottom: layout.gap,
};

const staticStyles = StyleSheet.create({container});

function WorkoutsListLoader(): ReactElement {
  const loading = useAppSelector(state => state.workouts.loading);

  return (
    <View style={staticStyles.container}>
      {loading ? (
        <Loader />
      ) : null}
    </View>
  );
}

export default WorkoutsListLoader;
