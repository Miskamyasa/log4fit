import {ReactElement} from "react";
import {StyleSheet, ViewStyle} from "react-native";

import Div from "../components/Div";
import Span from "../components/Span";
import {__t} from "../i18";
import layout from "../layout/constants";


const container: ViewStyle = {
  alignSelf: "center",
  borderRadius: 16,
  width: layout.listItemWidth,
  height: 120,
  justifyContent: "center",
  alignItems: "center",
};

const staticStyles = StyleSheet.create({
  container,
});

function GotoWorkout(): ReactElement {
  return (
    <Div
      onPress={() => {console.log("123");}}
      colorName="gotoWorkoutBackground"
      style={staticStyles.container}>
      <Span
        colorName="gotoWorkoutText"
        weight="600"
        size={24}>
        {__t("workout.startWorkout")}
      </Span>
    </Div>
  );
}

export default GotoWorkout;
