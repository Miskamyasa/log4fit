import {memo, ReactNode} from "react"

import RNModal from "react-native-modal"

import {timings} from "../constants/timings"
import {createStaticStyles} from "../helpers/createStaticStyles"

const staticStyles = createStaticStyles({
    modal: {
        alignItems: "center",
        justifyContent: "flex-end",
    },
})

export const Modal = memo(function Modal(props: {
    children: ReactNode
    visible: boolean
    closeModal: () => void
}) {
    return (
        <RNModal
            avoidKeyboard
            hideModalContentWhileAnimating
            useNativeDriver
            useNativeDriverForBackdrop
            animationInTiming={timings.modal.open}
            animationOutTiming={timings.modal.close}
            backdropOpacity={0.5}
            isVisible={props.visible}
            style={staticStyles.modal}
            onBackButtonPress={props.closeModal}
            onBackdropPress={props.closeModal}>

            {props.children}

        </RNModal>
    )
})
