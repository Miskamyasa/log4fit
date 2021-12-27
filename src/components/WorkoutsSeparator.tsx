import {ReactElement} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";


const container: ViewStyle = {
  height: 10,
};

const staticStyles = StyleSheet.create({
  container,
});

function WorkoutsSeparator(): ReactElement {
  return (
    <View style={staticStyles.container} />
  );
}

export default WorkoutsSeparator;
