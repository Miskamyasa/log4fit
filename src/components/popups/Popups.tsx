import {Fragment} from "react"

import {observer} from "mobx-react"
import Modal from "react-native-modal"

import {timings} from "../../constants/timings"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {useStores} from "../../store/useStores"
import {Div} from "../Div"
import {Errors} from "../errors/Errors"

const styles = createStaticStyles({
    modal: {
        alignItems: "center",
        justifyContent: "center",
    },
    content: {},
})

export const Popups = observer(function Portal() {
    const {portalStore} = useStores()

    return (
        <Fragment>
            <Modal
                avoidKeyboard
                hideModalContentWhileAnimating
                useNativeDriver
                useNativeDriverForBackdrop
                animationIn="slideInDown"
                animationInTiming={timings.modal.open}
                animationOut="slideOutUp"
                animationOutTiming={timings.modal.close}
                backdropOpacity={0.5}
                isVisible={portalStore.visible}
                style={styles.modal}>
                <Div style={styles.content}>
                    {portalStore.current ?? null}
                </Div>
            </Modal>
            <Errors />
        </Fragment>
    )
})
