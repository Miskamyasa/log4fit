import {ReactElement, useCallback, useEffect} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import {useNavigation} from "@react-navigation/native";

import Div from "../components/Div";
import OverlayLoader from "../components/OverlayLoader";
import Span from "../components/Span";
import {__t} from "../i18";
import layout from "../layout/constants";
import {HomeStackNavigationProp} from "../navigation/types";
import {useAppDispatch, useAppSelector} from "../store";
import {startWorkout} from "../store/currentWorkout/actions";


const container: ViewStyle = {
  alignSelf: "center",
  borderRadius: 16,
  width: layout.listItemWidth,
  height: 120,
  padding: layout.gap,
};

const leftSide: ViewStyle = {
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const rightSide: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  alignItems: "flex-end",
};

const staticStyles = StyleSheet.create({
  container,
  leftSide,
  rightSide,
});


function GotoWorkout(): ReactElement {
  const {data, loading} = useAppSelector(state => state.currentWorkout);

  const navigation = useNavigation<HomeStackNavigationProp>();
  const dispatch = useAppDispatch();

  const handlePress = useCallback(() => {
    if (data?.id) {
      return navigation.navigate("WorkoutScreen");
    }
    dispatch(startWorkout());
  }, [data, navigation, dispatch]);

  return (
    <Div
      onPress={handlePress}
      colorName="gotoWorkoutBackground"
      style={staticStyles.container}>
      {loading ? (
        <OverlayLoader />
      ) : null}
      <View style={staticStyles.leftSide}>
        <Span
          colorName="gotoWorkoutText"
          weight="600"
          size={24}>
          {__t(data?.id ? "workout.continueWorkout" : "workout.startWorkout")}
        </Span>
      </View>
      <View style={staticStyles.rightSide}>
        <Span>123</Span>
      </View>

    </Div>
  );
}

export default GotoWorkout;
