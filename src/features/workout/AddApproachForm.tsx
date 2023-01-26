import {ReactElement, useCallback} from "react"
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native"

import Container from "../../components/ActionSheet/Container"
import Row from "../../components/ActionSheet/Row"
import Submit from "../../components/ActionSheet/Submit"
import Title from "../../components/ActionSheet/Title"
import Span from "../../components/Span"
import {__t} from "../../i18"
import {useAppSelector} from "../../store"
import {Skill} from "../../store/skills/types"

import ChangeValue from "./ChangeValue"
import Controls from "./Controls"
import Input from "./Input"


type _Props = {
  dismiss: () => void,
  submit: () => void,
  lastWeight: number,
  repeats: string,
  handleRepeatsChange: (text: string) => void,
  weight: string,
  handleWeightChange: (text: string) => void,
  skillId: Skill["id"],
}

const label: TextStyle = {
  fontSize: 15,
  marginBottom: 3,
}

const inputItem: ViewStyle = {
  flexDirection: "row",
}

const staticStyles = StyleSheet.create({
  label,
  inputItem,
})

function AddApproachForm(props: _Props): ReactElement {
  const {
    dismiss,
    submit,
    lastWeight = 0,
    repeats,
    handleRepeatsChange,
    weight,
    handleWeightChange,
    skillId,
  } = props


  const increaseRepeats = useCallback(() => {
    handleRepeatsChange(String(Number(repeats) + 1))
  }, [repeats, handleRepeatsChange])

  const decreaseRepeats = useCallback(() => {
    handleRepeatsChange(String(Number(repeats) - 1))
  }, [repeats, handleRepeatsChange])

  const value = useAppSelector(state => state.common.weightSteps[skillId]) || 1

  const increaseWeight = useCallback(() => {
    handleWeightChange(String(Number(weight) + Number(value)))
  }, [handleWeightChange, weight, value])

  const decreaseWeight = useCallback(() => {
    handleWeightChange(String(Number(weight) - Number(value)))
  }, [handleWeightChange, weight, value])

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
              maxLength={2}
              width={64}
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
        onPress={submit} />

    </Container>
  )
}

export default AddApproachForm
