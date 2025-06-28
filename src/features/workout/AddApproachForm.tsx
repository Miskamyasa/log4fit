import {useCallback, useContext} from "react"
import {View} from "react-native"

import {observer} from "mobx-react"

import {Container} from "../../components/ActionSheet/Container"
import {Submit} from "../../components/ActionSheet/Submit"
import {Title} from "../../components/ActionSheet/Title"
import {Row} from "../../components/Row"
import {Span} from "../../components/Span"
import {timings} from "../../constants/timings"
import {analytics} from "../../helpers/analytics"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__t} from "../../helpers/i18n"
import type {Skill} from "../../store/skills/SkillsStore"
import {useStores} from "../../store/useStores"
import {weights} from "../../store/weights/WeightsStore"

import {AddApproachContext} from "./AddApproachProvider"
import {ChangeValue} from "./ChangeValue"
import {Controls} from "./Controls"
import {Input} from "./Input"

const staticStyles = createStaticStyles({
    label: {
        fontSize: 15,
        marginBottom: 3,
    },
    inputItem: {
        flexDirection: "row",
    },
})

export const AddApproachForm = observer(function AddApproachForm(props: {
    dismiss: () => void
    lastWeight: number
    lastRepeats: number
    skillId: Skill["id"]
}) {
    const {dismiss, lastWeight, lastRepeats, skillId} = props
    const {weightsStore, skillsStore, workoutsStore, approachesStore} = useStores()

    const skill = skillsStore.registry[skillId]

    const step = weightsStore.settings[skillId] ?? weights.options[0]

    const {repeats, weight, handleRepeatsChange, handleWeightChange} = useContext(AddApproachContext)

    const increaseRepeats = useCallback(() => {
        analytics.trackEvent("increase_repeats_by_button")
        handleRepeatsChange(Number(repeats) + 1)
    }, [repeats, handleRepeatsChange])

    const decreaseRepeats = useCallback(() => {
        analytics.trackEvent("decrease_repeats_by_button")
        handleRepeatsChange(Number(repeats) - 1)
    }, [repeats, handleRepeatsChange])

    const increaseWeight = useCallback(() => {
        analytics.trackEvent("increase_weight_by_button", {step})
        handleWeightChange(Number(weight) + Number(step))
    }, [handleWeightChange, weight, step])

    const decreaseWeight = useCallback(() => {
        analytics.trackEvent("decrease_weight_by_button", {step})
        handleWeightChange(Number(weight) - Number(step))
    }, [handleWeightChange, weight, step])

    const handleSubmit = (): void => {
        dismiss()
        setTimeout(() => {
            if (skillId) {
                analytics.trackEvent("add_approach_form_submit", {
                    skill: skill.title.en,
                    weight: Number(weight),
                    repeats: Number(repeats),
                })
                approachesStore.addApproach(workoutsStore.current!, skillId, Number(weight), Number(repeats))
            }
        }, timings.modal.close)
    }

    return (
        <Container>
            <Title onClosePress={dismiss}>
                {`${__t("workouts.lastWeight")} - ${lastWeight}`}
            </Title>
            <Row>
                <Span
                    flex
                    lines={2}
                    style={staticStyles.label}>
                    {__t("workouts.multiplication")}
                </Span>
                <Controls skillId={skillId} />
            </Row>
            <Row>
                <View>
                    <Span style={staticStyles.label}>{__t("workouts.repeatsLabel")}</Span>
                    <View style={staticStyles.inputItem}>
                        <Input
                            ignoreAnalyticsValue={String(lastRepeats)}
                            maxLength={2}
                            name="repeats"
                            value={repeats}
                            width={73}
                            onChange={handleRepeatsChange} />
                        <ChangeValue
                            decrease={decreaseRepeats}
                            increase={increaseRepeats} />
                    </View>
                </View>
                <View>
                    <Span style={staticStyles.label}>{__t("workouts.weightLabel")}</Span>
                    <View style={staticStyles.inputItem}>
                        <Input
                            ignoreAnalyticsValue={String(lastWeight)}
                            maxLength={5}
                            name="weight"
                            value={weight}
                            width={104}
                            onChange={handleWeightChange} />
                        <ChangeValue
                            decrease={decreaseWeight}
                            increase={increaseWeight} />
                    </View>
                </View>
            </Row>
            <Submit
                text={__t("workouts.addApproach")}
                onPress={handleSubmit} />
        </Container>
    )
})
