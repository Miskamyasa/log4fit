import {ReactElement, useCallback, useContext} from "react"
import {View} from "react-native"

import Container from "../../components/ActionSheet/Container"
import Submit from "../../components/ActionSheet/Submit"
import Title from "../../components/ActionSheet/Title"
import Row from "../../components/Row"
import Span from "../../components/Span"
import timings from "../../constants/timings"
import analytics from "../../helpers/analytics"
import createStaticStyles from "../../helpers/createStaticStyles"
import idGenerator from "../../helpers/idGenerator"
import {__t} from "../../i18"
import {useAppDispatch, useAppSelector} from "../../store"
import {addApproach} from "../../store/approaches/actions"
import {Skill} from "../../store/skills/types"

import {AddApproachContext} from "./AddApproachProvider"
import ChangeValue from "./ChangeValue"
import Controls from "./Controls"
import Input from "./Input"


const staticStyles = createStaticStyles({
  label: {
    fontSize: 15,
    marginBottom: 3,
  },
  inputItem: {
    flexDirection: "row",
  },
})

type _Props = {
  dismiss: () => void,
  lastWeight: number,
  lastRepeats: number,
  skillId: Skill["id"],
}

function AddApproachForm(props: _Props): ReactElement {
  const {dismiss, lastWeight, lastRepeats, skillId} = props

  const workoutId = useAppSelector(state => state.workouts.current?.id)
  const skill = useAppSelector(state => state.skills.store[skillId])
  const step = useAppSelector(state => state.common.weightSteps[skillId]) || 1

  const {repeats, weight, handleRepeatsChange, handleWeightChange} = useContext(AddApproachContext)

  const increaseRepeats = useCallback(() => {
    analytics.sendEvent("increase_repeats_by_button")
    handleRepeatsChange(Number(repeats) + 1)
  }, [repeats, handleRepeatsChange])

  const decreaseRepeats = useCallback(() => {
    analytics.sendEvent("decrease_repeats_by_button")
    handleRepeatsChange(Number(repeats) - 1)
  }, [repeats, handleRepeatsChange])

  const increaseWeight = useCallback(() => {
    analytics.sendEvent("increase_weight_by_button", {step})
    handleWeightChange(Number(weight) + Number(step))
  }, [handleWeightChange, weight, step])

  const decreaseWeight = useCallback(() => {
    analytics.sendEvent("decrease_weight_by_button", {step})
    handleWeightChange(Number(weight) - Number(step))
  }, [handleWeightChange, weight, step])

  const dispatch = useAppDispatch()
  const handleSubmit = useCallback(() => {
    dismiss()
    setTimeout(() => {
      if (workoutId && skillId) {
        analytics.sendEvent("add_approach_form_submit", {
          skill: skill.title["en"],
          weight: Number(weight),
          repeats: Number(repeats),
        })
        dispatch(addApproach({
          id: idGenerator(),
          workoutId,
          skillId,
          weight: Number(weight),
          repeats: Number(repeats),
        }))
      }
    }, timings.modalClose)
  }, [dismiss, dispatch, repeats, skill.title, skillId, weight, workoutId])

  return (
    <Container>
      <Title onClosePress={dismiss}>
        {`${__t("workouts.lastWeight")} - ${lastWeight}`}
      </Title>

      <Row>
        <View>
          <Span style={staticStyles.label}>{__t("workouts.repeatsLabel")}</Span>
          <View style={staticStyles.inputItem}>
            <Input
              name="repeats"
              ignoreAnalyticsValue={String(lastRepeats)}
              maxLength={2}
              width={73}
              value={repeats}
              onChange={handleRepeatsChange} />
            <ChangeValue
              increase={increaseRepeats}
              decrease={decreaseRepeats} />
          </View>
        </View>

        <View>
          <Span style={staticStyles.label}>{__t("workouts.weightLabel")}</Span>
          <View style={staticStyles.inputItem}>
            <Input
              name="weight"
              ignoreAnalyticsValue={String(lastWeight)}
              width={104}
              maxLength={5}
              value={weight}
              onChange={handleWeightChange} />
            <ChangeValue
              increase={increaseWeight}
              decrease={decreaseWeight} />
          </View>
        </View>

      </Row>

      <Row>
        <Span>&nbsp;</Span>
        <Controls skillId={skillId} />
      </Row>

      <Submit
        text={__t("workouts.addApproach")}
        onPress={handleSubmit} />

    </Container>
  )
}

export default AddApproachForm
