import {memo, ReactElement, ReactNode} from "react";
import {StyleSheet, ViewStyle} from "react-native";

import RNModal from "react-native-modal";

import useKeyboard from "../hooks/useKeyboard";
import {timings} from "../layout/constants";


type _Props = {
  children: ReactNode,
  visible: boolean,
  closeModal: () => void,
};


const modal: ViewStyle = {
  alignItems: "center",
  justifyContent: "flex-end",
  // position: "absolute",
  // bottom: 100,
};

const staticStyles = StyleSheet.create({
  modal,
});

function Modal(props: _Props): ReactElement {
  const {visible, closeModal, children} = props;

  const [, , handleUnhandledTouches] = useKeyboard();

  return (

    <RNModal
      useNativeDriver
      useNativeDriverForBackdrop
      avoidKeyboard
      animationOutTiming={timings.modalClose}
      animationInTiming={timings.openModal}
      backdropOpacity={0.5}
      // onBackdropPress={closeModal}
      // onStartShouldSetResponder={handleUnhandledTouches}
      hideModalContentWhileAnimating
      isVisible={visible}
      style={staticStyles.modal}
      onBackButtonPress={closeModal}>

      {children}

    </RNModal>
  );
}

export default memo(Modal);
