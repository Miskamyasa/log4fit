import {Fragment, memo, ReactElement, useCallback, useState} from "react"


import {primaryColors} from "../../colors/colors"
import Div from "../../components/Div"
import Modal from "../../components/Modal"
import Span from "../../components/Span"
import timings from "../../constants/timings"
import idGenerator from "../../helpers/idGenerator"
import useBoolean from "../../hooks/useBoolean"
import useKeyboard from "../../hooks/useKeyboard"
import {__t} from "../../i18"
import {useAppDispatch, useAppSelector} from "../../store"
import {addApproach} from "../../store/approaches/actions"
import {Skill} from "../../store/skills/types"

import AddApproachForm from "./AddApproachForm"
import {buttonsStyles} from "./styles"


type _Props = {
  skillId: Skill["id"],
  lastWeight: number,
}


function validateRepeats(str = "1"): string {
  const n = parseInt(str, 10)
  if (!Number.isFinite(n) || n <= 1) {
    return "1"
  }
  if (n > 99) {
    return "99"
  }
  return String(n)
}

function validateWeight(str = "0"): string {
  const [val, dec] = str.split(".")
  if (str.split(".").length === 1) {
    const n = Number(str)
    if (!Number.isFinite(n) || n <= 0) {
      return "0"
    }
    if (n > 999) {
      return "999"
    }
    return String(n)
  }
  return `${val}.${dec}`
}

function AddApproachButton({skillId, lastWeight = 0}: _Props): ReactElement {
  const workoutId = useAppSelector(state => state.workouts.current?.id)

  const [, dismissKeyboard] = useKeyboard()
  const [visible, openModal, closeModal] = useBoolean(false, undefined, dismissKeyboard)

  const [repeats, setRepeats] = useState("10")
  const handleRepeatsChange = useCallback((value: string) => {
    setRepeats(validateRepeats(value))
  }, [])

  const [weight, setWeight] = useState(String(lastWeight))
  const handleWeightChange = useCallback((value: string) => {
    setWeight(validateWeight(value))
  }, [])

  const dispatch = useAppDispatch()
  const handleSubmit = useCallback(() => {
    closeModal()
    setTimeout(() => {
      if (workoutId && skillId) {
        dispatch(addApproach({
          id: idGenerator(),
          workoutId,
          skillId,
          weight: Number(weight),
          repeats: Number(repeats),
        }))
      }
    }, timings.modalClose)
  }, [closeModal, dispatch, workoutId, skillId, weight, repeats])

  return (
    <Fragment>

      <Div
        onPress={visible ? closeModal : openModal}
        style={buttonsStyles.allButtons}
        theme={primaryColors.background}>
        <Span
          style={buttonsStyles.text}
          colorName={"alwaysWhite"}
          lines={2}>
          {__t("workouts.addApproach").split(" ").join("\n")}
        </Span>
      </Div>

      <Modal
        visible={visible}
        closeModal={closeModal}>

        <AddApproachForm
          submit={handleSubmit}
          dismiss={closeModal}
          repeats={repeats}
          handleRepeatsChange={handleRepeatsChange}
          weight={weight}
          handleWeightChange={handleWeightChange}
          skillId={skillId}
          lastWeight={lastWeight} />

      </Modal>

    </Fragment>
  )
}

export default memo(AddApproachButton)
