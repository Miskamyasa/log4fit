import React, {Fragment, memo, ReactElement, useCallback, useContext} from "react";
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native";

import {isEmpty} from "lodash";

import {primaryColors, secondaryColors} from "../../colors";
import Div from "../../components/Div";
import Modal from "../../components/Modal";
import PageTitle from "../../components/PageTitle";
import Span from "../../components/Span";
import useBoolean from "../../hooks/useBoolean";
import useKeyboard from "../../hooks/useKeyboard";
import {__locale, __t} from "../../i18";
import layout from "../../layout/constants";
import {navigation} from "../../navigation/config";
import {useAppDispatch, useAppSelector} from "../../store";
import {addCustomSkill} from "../../store/skills/actions";
import {addSkillToWorkout} from "../../store/workouts/actions";

import NewSkillForm from "./NewSkillForm";
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

  const [, dismissKeyboard] = useKeyboard();
  const [visible, openModal, closeModal] = useBoolean(false, undefined, dismissKeyboard);

  const dispatch = useAppDispatch();

  const handleStart = useCallback(() => {
    if (selected) {
      dispatch(addSkillToWorkout(selected.id));
      setSelected(null);
    }
  }, [dispatch, selected, setSelected]);

  const handleSubmitNewSkill = useCallback((text: string) => {
    closeModal();
    if (text.length > 0) {
      dispatch(addCustomSkill(text));
    }
  }, [dispatch]);

  if (!workout || isEmpty(workout)) {
    navigation.replace("HomeScreen", undefined);
    return null;
  }

  return (
    <Fragment>
      <View style={staticStyles.container}>

        <Div
          onPress={openModal}
          theme={primaryColors.background}
          style={staticStyles.card}>
          <Span
            lines={2}
            colorName={"alwaysWhite"}
            style={staticStyles.boldText}>
            {__t("exercises.create")}
          </Span>
        </Div>

        <Modal
          visible={visible}
          closeModal={closeModal}>
          <NewSkillForm
            submit={handleSubmitNewSkill}
            dismiss={closeModal} />
        </Modal>

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
