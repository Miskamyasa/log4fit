import {memo, ReactElement, useCallback} from "react"


import {primaryColors} from "../../colors/colors"
import Div from "../../components/Div"
import Modal from "../../components/Modal"
import Span from "../../components/Span"
import {defaultRepeats, defaultWeight} from "../../constants/common"
import analytics from "../../helpers/analytics"
import useBoolean from "../../hooks/useBoolean"
import useKeyboard from "../../hooks/useKeyboard"
import {__t} from "../../i18"
import {Skill} from "../../store/skills/types"

import AddApproachForm from "./AddApproachForm"
import {AddApproachProvider} from "./AddApproachProvider"
import {buttonsStyles} from "./styles"


interface Props {
  skillId: Skill["id"]
  lastRepeats?: number
  lastWeight?: number
}

function AddApproachButton(props: Props): ReactElement {
  const {skillId, lastWeight = defaultWeight, lastRepeats = defaultRepeats} = props

  const [, dismissKeyboard] = useKeyboard()
  const [visible, openModal, closeModal] = useBoolean(false, undefined, dismissKeyboard)

  const openAddApproachModal = useCallback(() => {
    analytics.sendEvent("add_approach_form_open")
    openModal()
  }, [openModal])

  return (
    <AddApproachProvider
      repeats={String(lastRepeats)}
      weight={String(lastWeight)}>

      <Div
        style={buttonsStyles.allButtons}
        theme={primaryColors.background}
        onPress={openAddApproachModal}>
        <Span
          colorName={"alwaysWhite"}
          lines={2}
          style={buttonsStyles.text}>
          {__t("workouts.addApproach").split(" ").join("\n")}
        </Span>
      </Div>

      <Modal
        closeModal={closeModal}
        visible={visible}>
        <AddApproachForm
          dismiss={closeModal}
          lastRepeats={lastRepeats}
          lastWeight={lastWeight}
          skillId={skillId} />
      </Modal>

    </AddApproachProvider>
  )
}

export default memo(AddApproachButton)
