import {memo, ReactElement, ReactNode} from "react"

import RNModal from "react-native-modal"

import timings from "../constants/timings"
import createStaticStyles from "../helpers/createStaticStyles"


interface Props {
  children: ReactNode
  visible: boolean
  closeModal: () => void
}

const staticStyles = createStaticStyles({
  modal: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
})

function Modal(props: Props): ReactElement {
  return (
    <RNModal
      avoidKeyboard
      hideModalContentWhileAnimating
      useNativeDriver
      useNativeDriverForBackdrop
      animationInTiming={timings.openModal}
      animationOutTiming={timings.modalClose}
      backdropOpacity={0.5}
      isVisible={props.visible}
      style={staticStyles.modal}
      onBackButtonPress={props.closeModal}
      onBackdropPress={props.closeModal}>

      {props.children}

    </RNModal>
  )
}

export default memo(Modal)
