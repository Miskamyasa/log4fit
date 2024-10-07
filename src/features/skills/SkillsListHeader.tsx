import {Fragment, useCallback, useContext, type ReactElement} from "react"
import {StyleSheet, View} from "react-native"

import {isEmpty} from "lodash"
import {observer} from "mobx-react"

import {primaryColors, secondaryColors} from "../../colors/colors"
import {Div} from "../../components/Div"
import {Modal} from "../../components/Modal"
import {PageTitle} from "../../components/PageTitle"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {analytics} from "../../helpers/analytics"
import {__locale, __t} from "../../helpers/i18n"
import {useBoolean} from "../../hooks/useBoolean"
import {useKeyboard} from "../../hooks/useKeyboard"
import {navigation} from "../../navigation/config"
import {useAppDispatch, useAppSelector} from "../../store"
import {useStores} from "../../store/useStores"
import {addSkillToWorkout} from "../../store/workouts/actions"

import {NewSkillForm} from "./NewSkillForm"
import {SelectedSkillContext} from "./SelectedSkillProvider"

const staticStyles = StyleSheet.create({
    boldText: {
        fontSize: 15,
        fontWeight: "600",
    },
    card: {
        borderRadius: layout.gap,
        height: 64,
        justifyContent: "center",
        overflow: "hidden",
        paddingHorizontal: layout.gap * 1.2,
        paddingVertical: layout.gap,
        width: "32%",
    },
    container: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: layout.gap,
    },
    text: {
        fontSize: 15,
    },
})

export const SkillsListHeader = observer(function SkillsListHeader(): ReactElement | null {
    const {skillsStore} = useStores()

    const workout = useAppSelector(state => state.workouts.current)

    const {selected, setSelected} = useContext(SelectedSkillContext)

    const [, dismissKeyboard] = useKeyboard()
    const [visible, openModal, closeModal] = useBoolean(false, undefined, dismissKeyboard)

    const dispatch = useAppDispatch()

    const handleStart = useCallback(() => {
        if (selected) {
            analytics.sendEvent("add_skill_to_workout", {skill: selected.title["en"]})
            dispatch(addSkillToWorkout(selected.id))
            setSelected(null)
        }
    }, [dispatch, selected, setSelected])

    const handleSubmitNewSkill = useCallback((text: string) => {
        closeModal()
        if (text.length > 0) {
            analytics.sendEvent("new_skill_form_submit", {title: text})
            skillsStore.addCustomSkill(text)
        }
    }, [closeModal, skillsStore])

    const openNewSkillModal = useCallback(() => {
        analytics.sendEvent("new_skill_form_open")
        openModal()
    }, [openModal])

    if (!workout || isEmpty(workout)) {
        navigation.replace("HomeScreen", undefined)
        return null
    }

    return (
        <Fragment>
            <View style={staticStyles.container}>
                <Div
                    style={staticStyles.card}
                    theme={primaryColors.background}
                    onPress={openNewSkillModal}>
                    <Span
                        colorName="alwaysWhite"
                        lines={2}
                        style={staticStyles.boldText}>
                        {__t("exercises.create")}
                    </Span>
                </Div>
                <Modal
                    closeModal={closeModal}
                    visible={visible}>
                    <NewSkillForm
                        dismiss={closeModal}
                        submit={handleSubmitNewSkill} />
                </Modal>
                <Div
                    style={staticStyles.card}
                    theme={secondaryColors.background}>
                    <Span
                        lines={2}
                        style={staticStyles.text}>
                        {__t("exercises.selected")}
                        {":\n"}
                        {selected ? skillsStore.registry.get(selected.id)!.title[__locale()] : "-"}
                    </Span>
                </Div>
                <Div
                    disabled={!selected}
                    style={staticStyles.card}
                    theme={primaryColors.background}
                    onPress={handleStart}>
                    <Span
                        colorName="alwaysWhite"
                        lines={2}
                        style={staticStyles.boldText}>
                        {__t("workouts.addToWorkout")}
                    </Span>
                </Div>
            </View>
            <PageTitle title={__t("exercises.title")} />
        </Fragment>
    )
})
