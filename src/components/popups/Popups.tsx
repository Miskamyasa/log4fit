import {Fragment} from "react"
import {View} from "react-native"

import {observer} from "mobx-react"
import Modal from "react-native-modal"

import {timings} from "../../constants/timings"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {useStores} from "../../store/useStores"
import {Errors} from "../errors/Errors"

const styles = createStaticStyles({
  modal: {
    alignItems: "center",
    justifyContent: "center",
  },
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
        <View>
          {portalStore.current ?? null}
        </View>
      </Modal>
      <Errors />
    </Fragment>
  )
})
