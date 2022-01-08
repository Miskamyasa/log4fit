import React, {Fragment, memo, ReactElement, useCallback, useState} from "react";
import {StyleSheet, ViewStyle} from "react-native";
import Modal from "react-native-modal";

import {primaryColors} from "../../colors";
import Div from "../../components/Div";
import Span from "../../components/Span";
import useKeyboard from "../../hooks/useKeyboard";
import {__t} from "../../i18";
import {Exercise} from "../../store/exercises/types";
import AddApproachForm from "./AddApproachForm";
import {MultiplicationValues} from "./Controls";
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
  if (!Number.isFinite(n) || n < 1) {
    return "1";
  }
  if (n > 99) {
    return "99";
  }
  return String(n);
}

function validateWeight(str = "0"): string {
  const n = parseFloat(str);
  if (!Number.isFinite(n) || n < 0) {
    return "0";
  }
  if (n > 999) {
    return "999";
  }
  return String(n);
}

function AddApproachButton({exerciseId, lastWeight = 0}: _Props): ReactElement {
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

  const [multi, setMulti] = useState<MultiplicationValues>("1");
  const handleChangeMulti = useCallback((value: MultiplicationValues) => {
    setMulti(value);
  }, []);

  const handleUnhandledTouches = useCallback(() => {
    dismissKeyboard();
    return false;
  }, [dismissKeyboard]);

  const handleSubmit = useCallback(() => {
    closeModal();
    setTimeout(() => {
      // TODO submit action
      console.log({exerciseId, warmup, repeats, weight});
    }, timings.modalClose);
  }, [closeModal, exerciseId, warmup, repeats, weight]);

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
          lastWeight={lastWeight}
          multi={multi}
          handleChangeMulti={handleChangeMulti} />

      </Modal>

    </Fragment>
  );
}

export default memo(AddApproachButton);
