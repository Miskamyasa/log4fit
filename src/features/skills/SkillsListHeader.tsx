import {Fragment, memo, ReactElement, useCallback, useContext} from "react";
import {Alert, StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {isEmpty} from "lodash";

import {primaryColors, secondaryColors} from "../../colors";
import Div from "../../components/Div";
import PageTitle from "../../components/PageTitle";
import Span from "../../components/Span";
import {__locale, __t} from "../../i18";
import layout from "../../layout/constants";
import {navigation} from "../../navigation/config";
import {useAppDispatch, useAppSelector} from "../../store";
import {addCustomSkill} from "../../store/skills/actions";
import {addSkillToWorkout} from "../../store/workouts/actions";

import {SelectedSkillContext} from "./SelectedSkillProvider";


const container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: layout.gap,
};

const card: ViewStyle = {
  width: "32%",
  borderRadius: layout.gap,
  overflow: "hidden",
  height: 64,
  paddingVertical: layout.gap,
  paddingHorizontal: layout.gap * 1.2,
  justifyContent: "center",
};

const text: TextStyle = {
  fontSize: 15,
};

const boldText: TextStyle = {
  ...text,
  fontWeight: "600",
};

const selectedText: TextStyle = {
  ...boldText,
  fontSize: 18,
};

const selected: ViewStyle = {
  ...container,
  ...card,
};

const staticStyles = StyleSheet.create({
  container,
  card,
  text,
  boldText,
  selectedText,
  selected,
});

function SkillsListHeader(): ReactElement | null {
  const workout = useAppSelector(state => state.workouts.current);
  const skills = useAppSelector(state => state.skills.store);

  const {selected, setSelected} = useContext(SelectedSkillContext);

  const dispatch = useAppDispatch();

  const handleStart = useCallback(() => {
    if (selected) {
      dispatch(addSkillToWorkout(selected.id));
      setSelected(null);
    }
  }, [dispatch, selected, setSelected]);

  const handleCreatePress = useCallback(() => {
    // FIXME doesn't work on android and sometimes blocks UI on ios
    Alert.prompt("text", "Введите название", (text): void => {
      if (text && text.length > 1) {
        dispatch(addCustomSkill(text));
      }
    }, "plain-text");
  }, [dispatch]);


  if (!workout || isEmpty(workout)) {
    navigation.replace("HomeScreen", undefined);
    return null;
  }

  return (
    <Fragment>
      <View style={staticStyles.container}>

        <Div
          onPress={handleCreatePress}
          theme={primaryColors.background}
          style={staticStyles.card}>
          <Span
            lines={2}
            colorName={"alwaysWhite"}
            style={staticStyles.boldText}>
            {__t("exercises.create")}
          </Span>
        </Div>

        <Div
          theme={secondaryColors.background}
          style={staticStyles.card}>
          <Span
            style={staticStyles.text}
            lines={2}>
            {__t("exercises.selected")}
            {":\n"}
            {selected ? skills[selected.id].title[__locale()] : "-"}
          </Span>
        </Div>

        <Div
          disabled={!selected}
          onPress={handleStart}
          theme={primaryColors.background}
          style={staticStyles.card}>
          <Span
            colorName={"alwaysWhite"}
            lines={2}
            style={staticStyles.boldText}>
            {__t("workouts.addToWorkout")}
          </Span>
        </Div>

      </View>

      <PageTitle title={__t("exercises.title")} />

    </Fragment>
  );
}

export default memo(SkillsListHeader);
