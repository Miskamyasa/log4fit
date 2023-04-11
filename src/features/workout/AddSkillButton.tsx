import {memo, ReactElement, RefObject, useCallback} from "react"
import {ScrollView} from "react-native"

import {secondaryColors} from "../../colors/colors"
import Div from "../../components/Div"
import Span from "../../components/Span"
import analytics from "../../helpers/analytics"
import {__t} from "../../helpers/i18n"

import {buttonsStyles} from "./styles"


interface Props {
    scrollRef: RefObject<ScrollView>
}

function AddSkillButton({scrollRef}: Props): ReactElement {
    const gotoAddSkill = useCallback(() => {
        if (scrollRef.current) {
            analytics.sendEvent("goto_add_skill_pressed")
            scrollRef.current.scrollToEnd({animated: true})
        }
    }, [scrollRef])

    return (
        <Div
            style={buttonsStyles.allButtons}
            theme={secondaryColors.background}
            onPress={gotoAddSkill}>
            <Span
                colorName={"text"}
                lines={2}
                style={buttonsStyles.text}>
                {__t("workouts.addSkill").split(" ").join("\n")}
            </Span>
        </Div>
    )
}

export default memo(AddSkillButton)
