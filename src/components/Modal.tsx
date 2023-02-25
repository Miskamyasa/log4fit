import {memo, ReactElement, ReactNode} from "react"

import RNModal from "react-native-modal"

import timings from "../constants/timings"
import createStaticStyles from "../helpers/createStaticStyles"


type _Props = {
  children: ReactNode,
  visible: boolean,
  closeModal: () => void,
}

const staticStyles = createStaticStyles({
  modal: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
})

function Modal(props: _Props): ReactElement {
  return (
    <RNModal
      useNativeDriver
      useNativeDriverForBackdrop
      avoidKeyboard
      animationOutTiming={timings.modalClose}
      animationInTiming={timings.openModal}
      backdropOpacity={0.5}
      hideModalContentWhileAnimating
      isVisible={props.visible}
      style={staticStyles.modal}
      onBackdropPress={props.closeModal}
      onBackButtonPress={props.closeModal}>

      {props.children}

    </RNModal>
  )
}

export default memo(Modal)
