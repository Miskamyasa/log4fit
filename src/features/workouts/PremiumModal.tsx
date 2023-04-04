import React, {memo, ReactElement, useCallback} from "react"

import Container from "../../components/ActionSheet/Container"
import Submit from "../../components/ActionSheet/Submit"
import Title from "../../components/ActionSheet/Title"
import Div from "../../components/Div"
import Row from "../../components/Row"
import Span from "../../components/Span"
import {buttons} from "../../constants/defaultStyles"
import layout from "../../constants/layout"
import analytics from "../../helpers/analytics"
import createStaticStyles from "../../helpers/createStaticStyles"
import {__t} from "../../i18"
import {navigation} from "../../navigation/config"
import {useAppDispatch} from "../../store"
import {addWorkout} from "../../store/workouts/actions"


const staticStyles = createStaticStyles({
    cancel: {
        ...buttons,
        alignItems: "center",
        marginRight: layout.gap,
        flexGrow: 1,
    },
    continue: {
        ...buttons,
        alignItems: "center",
        flexGrow: 1,
    },
})

interface Props {
    dismiss: () => void
}

function PremiumModal({dismiss}: Props): ReactElement {
    const dispatch = useAppDispatch()

    const destroy = useCallback(() => {
        analytics.sendEvent("remove_old_workout_approved")
        dispatch(addWorkout())
    }, [dispatch])

    const goPremium = useCallback(() => {
        dismiss()
        analytics.sendEvent("redirect_to_premium_screen")
        navigation.navigate("PremiumScreen", undefined)
    }, [dismiss])

    return (
        <Container>
            <Title onClosePress={dismiss}>{__t("goPremium")}</Title>
            <Row>
                <Span
                    size={15}
                    weight={"400"}>
                    {__t("workouts.limit")}
                </Span>
            </Row>
            <Row>
                <Submit
                    text={__t("goPremium")}
                    onPress={goPremium} />
            </Row>
            <Row>
                <Div
                    style={staticStyles.cancel}
                    onPress={dismiss}>
                    <Span>{__t("cancel")}</Span>
                </Div>
                <Div
                    style={staticStyles.continue}
                    onPress={destroy}>
                    <Span>{__t("delete")}</Span>
                </Div>
            </Row>
        </Container>
    )
}

export default memo(PremiumModal)
