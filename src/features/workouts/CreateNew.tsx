import {useCallback, type ReactElement} from "react"

import {primaryColors} from "../../colors/colors"
import {Div} from "../../components/Div"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {analytics} from "../../helpers/analytics"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__t} from "../../helpers/i18n"
import {useAppDispatch, useAppSelector} from "../../store"
import {addWorkout} from "../../store/workouts/actions"

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

export function CreateNew(): ReactElement {
    const ids = useAppSelector(state => state.workouts.ids)

    const dispatch = useAppDispatch()
    const createNewWorkout = useCallback(() => {
        analytics.sendEvent("create_new_workout", {
            idsLength: ids.length,
        })
        dispatch(addWorkout())
    }, [ids.length, dispatch])

    return (
        <Div
            style={staticStyles.createNew}
            theme={primaryColors.background}
            onPress={createNewWorkout}>
            <Span
                colorName="alwaysWhite"
                weight="600">
                {__t("workouts.createNew")}
            </Span>
        </Div>
    )
}
