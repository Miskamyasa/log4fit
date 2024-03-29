import {Fragment, memo, ReactElement, useCallback, useContext} from "react"
import {StyleSheet, TextStyle, View, ViewStyle} from "react-native"

import {isEmpty} from "lodash"


import {primaryColors, secondaryColors} from "../../colors/colors"
import Div from "../../components/Div"
import Modal from "../../components/Modal"
import PageTitle from "../../components/PageTitle"
import Span from "../../components/Span"
import layout from "../../constants/layout"
import analytics from "../../helpers/analytics"
import {__locale, __t} from "../../helpers/i18n"
import useBoolean from "../../hooks/useBoolean"
import useKeyboard from "../../hooks/useKeyboard"
import {navigation} from "../../navigation/config"
import {useAppDispatch, useAppSelector} from "../../store"
import {addCustomSkill} from "../../store/skills/actions"
import {addSkillToWorkout} from "../../store/workouts/actions"

import NewSkillForm from "./NewSkillForm"
import {SelectedSkillContext} from "./SelectedSkillProvider"


const container: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: layout.gap,
}

const card: ViewStyle = {
    width: "32%",
    borderRadius: layout.gap,
    overflow: "hidden",
    height: 64,
    paddingVertical: layout.gap,
    paddingHorizontal: layout.gap * 1.2,
    justifyContent: "center",
}

const text: TextStyle = {
    fontSize: 15,
}

const boldText: TextStyle = {
    ...text,
    fontWeight: "600",
}

const selectedText: TextStyle = {
    ...boldText,
    fontSize: 18,
}

const selected: ViewStyle = {
    ...container,
    ...card,
}

const staticStyles = StyleSheet.create({
    container,
    card,
    text,
    boldText,
    selectedText,
    selected,
})

function SkillsListHeader(): ReactElement | null {
    const workout = useAppSelector(state => state.workouts.current)
    const skills = useAppSelector(state => state.skills.store)

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
            dispatch(addCustomSkill(text))
        }
    }, [closeModal, dispatch])

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
                        colorName={"alwaysWhite"}
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
                        {selected ? skills[selected.id].title[__locale()] : "-"}
                    </Span>
                </Div>

                <Div
                    disabled={!selected}
                    style={staticStyles.card}
                    theme={primaryColors.background}
                    onPress={handleStart}>
                    <Span
                        colorName={"alwaysWhite"}
                        lines={2}
                        style={staticStyles.boldText}>
                        {__t("workouts.addToWorkout")}
                    </Span>
                </Div>

            </View>

            <PageTitle title={__t("exercises.title")} />

        </Fragment>
    )
}

export default memo(SkillsListHeader)
