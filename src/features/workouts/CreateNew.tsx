import {ReactElement, useCallback} from "react"

import {primaryColors} from "../../colors/colors"
import Div from "../../components/Div"
import Modal from "../../components/Modal"
import Span from "../../components/Span"
import {limitWorkouts} from "../../constants/common"
import layout from "../../constants/layout"
import analytics from "../../helpers/analytics"
import createStaticStyles from "../../helpers/createStaticStyles"
import useBoolean from "../../hooks/useBoolean"
import {__t} from "../../i18"
import {useAppDispatch, useAppSelector} from "../../store"
import {addWorkout} from "../../store/workouts/actions"

import PremiumModal from "./PremiumModal"


const staticStyles = createStaticStyles({
  createNew: {
    borderRadius: layout.gap,
    overflow: "hidden",
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: layout.gap * 2,
  },
})

function CreateNew(): ReactElement {
  const payed = useAppSelector(state => state.offering.payed)
  const ids = useAppSelector(state => state.workouts.ids)

  const [visible, openModal, closeModal] = useBoolean(false)

  const dispatch = useAppDispatch()
  const createNewWorkout = useCallback(() => {
    analytics.sendEvent("create_new_workout")
    if (!payed && ids.length >= limitWorkouts) {
      analytics.sendEvent("remove_old_workout_asked")
      openModal()
      return
    }
    dispatch(addWorkout())
  }, [payed, ids.length, dispatch, openModal])

  return (
    <Div
      onPress={createNewWorkout}
      theme={primaryColors.background}
      style={staticStyles.createNew}>
      <Span
        weight={"600"}
        colorName={"alwaysWhite"}>
        {__t("workouts.createNew")}
      </Span>

      <Modal
        visible={visible}
        closeModal={closeModal}>
        <PremiumModal dismiss={closeModal} />
      </Modal>
    </Div>
  )
}

export default CreateNew
