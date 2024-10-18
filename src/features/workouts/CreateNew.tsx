import {useCallback, memo} from "react"

import {primaryColors} from "../../colors/colors"
import {Div} from "../../components/Div"
import {Span} from "../../components/Span"
import {layout} from "../../constants/layout"
import {analytics} from "../../helpers/analytics"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__t} from "../../helpers/i18n"
import {useStores} from "../../store/useStores"

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

export const CreateNew = memo(function CreateNew() {
    const {workoutsStore} = useStores()

    const createNewWorkout = useCallback(() => {
        analytics.trackEvent("create_new_workout")
        workoutsStore.addWorkout()
    }, [workoutsStore])

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
})
