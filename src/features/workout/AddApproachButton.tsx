import React, {Fragment, memo, ReactElement, useCallback, useState} from "react";
import {StyleSheet, ViewStyle} from "react-native";
import Modal from "react-native-modal";

import {primaryColors} from "../../colors";
import Div from "../../components/Div";
import Span from "../../components/Span";
import useKeyboard from "../../hooks/useKeyboard";
import {__t} from "../../i18";
import {useAppDispatch, useAppSelector} from "../../store";
import {addApproach} from "../../store/currentWorkout/actions";
import {Exercise} from "../../store/exercises/types";
import AddApproachForm from "./AddApproachForm";
import {buttonsStyles} from "./styles";


type _Props = {
  readonly exerciseId: Exercise["id"],
  readonly lastWeight: number,
};

const modal: ViewStyle = {
  alignItems: "center",
  justifyContent: "flex-end",
};

const staticStyles = StyleSheet.create({
  modal,
});

const timings = {
  openModal: 300,
  modalClose: 200,
};

function validateRepeats(str = "1"): string {
  const n = parseInt(str, 10);
  if (!Number.isFinite(n) || n <= 1) {
    return "1";
  }
  if (n > 99) {
    return "99";
  }
  return String(n);
}

function validateWeight(str = "0"): string {
  const [val, dec] = str.split(".");
  if (str.split(".").length === 1) {
    const n = Number(str);
    if (!Number.isFinite(n) || n <= 0) {
      return "0";
    }
    if (n > 999) {
      return "999";
    }
    return String(n);
  }
  return `${val}.${dec}`;
}

function AddApproachButton({exerciseId, lastWeight = 0}: _Props): ReactElement {
  const workoutId = useAppSelector(state => state.currentWorkout.workout?.id);

  const [, dismissKeyboard] = useKeyboard();
  const [visible, setVisible] = useState(false);

  const openModal = useCallback((): void => {
    setVisible(true);
  }, []);

  const closeModal = useCallback((): void => {
    dismissKeyboard();
    setVisible(false);
  }, [dismissKeyboard]);

  const [repeats, setRepeats] = useState("1");
  const handleRepeatsChange = useCallback((value: string) => {
    setRepeats(validateRepeats(value));
  }, []);

  const [weight, setWeight] = useState(String(lastWeight));
  const handleWeightChange = useCallback((value: string) => {
    setWeight(validateWeight(value));
  }, []);

  const [warmup, setWarmup] = useState(true);

  const handleUnhandledTouches = useCallback(() => {
    dismissKeyboard();
    return false;
  }, [dismissKeyboard]);

  const dispatch = useAppDispatch();
  const handleSubmit = useCallback(() => {
    closeModal();
    setTimeout(() => {
      if (workoutId) {
        dispatch(addApproach({
          workoutId,
          exerciseId,
          warmup,
          weight: Number(weight),
          repeats: Number(repeats),
        }));
      }
    }, timings.modalClose);
  }, [closeModal, dispatch, workoutId, exerciseId, warmup, weight, repeats]);

  return (
    <Fragment>

      <Div
        onPress={visible ? closeModal : openModal}
        style={buttonsStyles.addButtons}
        theme={primaryColors.background}>
        <Span
          style={buttonsStyles.text}
          colorName={"alwaysWhite"}
          lines={2}>
          {__t("workouts.addApproach").split(" ").join("\n")}
        </Span>
      </Div>

      <Modal
        useNativeDriver
        avoidKeyboard
        animationOutTiming={timings.modalClose}
        animationInTiming={timings.openModal}
        backdropOpacity={0.5}
        onBackdropPress={handleUnhandledTouches}
        onStartShouldSetResponder={handleUnhandledTouches}
        hideModalContentWhileAnimating
        isVisible={visible}
        style={staticStyles.modal}
        onBackButtonPress={closeModal}>

        <AddApproachForm
          submit={handleSubmit}
          dismiss={closeModal}
          repeats={repeats}
          handleRepeatsChange={handleRepeatsChange}
          weight={weight}
          handleWeightChange={handleWeightChange}
          warmup={warmup}
          setWarmup={setWarmup}
          lastWeight={lastWeight} />

      </Modal>

    </Fragment>
  );
}

export default memo(AddApproachButton);
