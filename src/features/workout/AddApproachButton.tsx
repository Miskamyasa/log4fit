import React, {Fragment, memo, ReactElement, useCallback, useState} from "react";
import {Keyboard, StyleSheet, ViewStyle} from "react-native";
import Modal from "react-native-modal";

import {primaryColors} from "../../colors";
import Div from "../../components/Div";
import Span from "../../components/Span";
import {__t} from "../../i18";
import layout from "../../layout/constants";
import {Exercise} from "../../store/exercises/types";
import AddApproachForm from "./AddApproachForm";
import {buttonsStyles} from "./styles";


type _Props = {
  readonly exerciseId: Exercise["id"],
  readonly lastWeight: number,
};

const modal: ViewStyle ={
  alignItems: "center",
  justifyContent: "flex-end",
  paddingBottom: layout.iphoneX ? layout.xSafe : layout.gap,
};

const staticStyles = StyleSheet.create({
  modal,
});

const timings = {
  openModal: 300,
  modalClose: 200,
};

function process(str = "0"): string {
  const n = parseInt(str, 10);
  if (!Number.isFinite(n) || n < 0) {
    return "0";
  }
  if (n > 999) {
    return "999";
  }
  return String(n);
}

function AddApproachButton({exerciseId, lastWeight}: _Props): ReactElement {
  const [visible, setVisible] = useState(false);

  const openModal = useCallback((): void => {
    setVisible(true);
  }, []);

  const closeModal = useCallback((): void => {
    setVisible(false);
  }, []);

  const handleSubmit = useCallback(() => {
    closeModal();
    setTimeout(() => {
      //onSubmit(value);
    }, timings.modalClose + 60);
  }, [closeModal]);

  const [repeats, setRepeats] = useState("0");
  const handleRepeatsChange = useCallback((value: string) => {
    setRepeats(process(value));
  }, []);

  const [weight, setWeight] = useState(String(lastWeight));
  const handleWeightChange = useCallback((value: string) => {
    setWeight(process(value));
  }, []);

  const [warmup, setWarmup] = useState(true);

  const handleUnhandledTouches = useCallback(() => {
    Keyboard.dismiss();
    return false;
  }, []);

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
        hideModalContentWhileAnimating
        isVisible={visible}
        onStartShouldSetResponder={handleUnhandledTouches}
        style={staticStyles.modal}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}>

        <AddApproachForm
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
