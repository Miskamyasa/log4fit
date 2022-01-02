import {memo, ReactElement, useCallback} from "react";
import {StyleSheet, View, ViewStyle} from "react-native";

import {ThemeProps} from "../../colors";
import Div from "../../components/Div";
import OverlayLoader from "../../components/OverlayLoader";
import Span from "../../components/Span";
import {__t} from "../../i18";
import layout from "../../layout/constants";
import {useAppDispatch, useAppSelector} from "../../store";
import {startWorkout} from "../../store/currentWorkout/actions";


const container: ViewStyle = {
  overflow: "hidden",
  borderRadius: layout.gap,
  height: 120,
};

const content: ViewStyle = {
  flex: 1,
  paddingVertical: layout.gap,
  paddingHorizontal: layout.gap + 4,
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
  content,
  leftSide,
  rightSide,
});

const colors: Record<"background" | "title", ThemeProps> = {
  background: {
    light: "rgba(210, 220, 230, 0.82)",
    dark: "rgba(29, 33, 37, 0.7)",
  },
  title: {
    light: "#245",
    dark: "#f1f4f9",
  },
};

function WorkoutsHeader(): ReactElement {
  const {workout, loading} = useAppSelector(state => state.currentWorkout);

  const dispatch = useAppDispatch();
  const handlePress = useCallback(() => {
    dispatch(startWorkout(workout?.id));
  }, [workout, dispatch]);

  return (
    <Div
      onPress={handlePress}
      theme={colors.background}
      style={staticStyles.container}>
      {loading ? (
        <OverlayLoader />
      ) : null}
      <View style={staticStyles.content}>
        <View style={staticStyles.leftSide}>
          <Span
            theme={colors.title}
            weight="600"
            size={24}>
            {__t(workout?.id ? "workouts.continueWorkout" : "workouts.startWorkout")}
          </Span>
        </View>
        <View style={staticStyles.rightSide}>
          <Span>123</Span>
        </View>
      </View>
    </Div>
  );
}

export default memo(WorkoutsHeader);
