import {useCallback, useMemo} from "react"
import {Alert, TouchableOpacity, View, type ViewStyle} from "react-native"

import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import {observer} from "mobx-react"

import type {ThemeProps} from "../../colors/types"
import {useThemeColor} from "../../colors/useThemeColor"
import {Span} from "../../components/Span"
import {EMPTY_ARRAY} from "../../constants/common"
import {layout} from "../../constants/layout"
import {analytics} from "../../helpers/analytics"
import {createStaticStyles} from "../../helpers/createStaticStyles"
import {__date, __day, __t} from "../../helpers/i18n"
import type {Skill} from "../../store/skills/SkillsStore"
import {useStores} from "../../store/useStores"
import type {Workout} from "../../store/workouts/WorkoutsStore"

import {WorkoutsListSkill} from "./WorkoutsListSkill"

const row: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: layout.gap / 3,
}

const staticStyles = createStaticStyles({
    content: {
        borderRadius: layout.gap,
        marginBottom: layout.gap,
        minHeight: layout.gap,
        overflow: "hidden",
        paddingBottom: layout.gap / 2,
    },
    day: {
        marginRight: layout.gap,
    },
    header: {
        ...row,
        marginBottom: layout.gap,
        paddingHorizontal: layout.gap,
        paddingTop: layout.gap,
    },
    row,
})

const colors: ThemeProps = {
    light: "#fcfcfe",
    dark: "rgba(14, 16, 18, 0.82)",
}

export const WorkoutsListCard = observer(function WorkoutsListCard(props: {id: Workout["id"]}) {
    const {workoutsStore} = useStores()

    const {skills = EMPTY_ARRAY, date: timestamp} = workoutsStore.registry[props.id]

    const backgroundColor = useThemeColor("viewBackground", colors)
    const dimmedBackground = useThemeColor("dimmedBackground")
    const textColor = useThemeColor("text")

    const style = useMemo(() => {
        return {
            list: [staticStyles.content, {backgroundColor}],
            current: [staticStyles.content, {backgroundColor: dimmedBackground}],
        }
    }, [backgroundColor, dimmedBackground])

    const renderSkill = useCallback((skillId: Skill["id"]) => {
        return (
            <WorkoutsListSkill
                key={skillId}
                id={skillId}
                workoutId={props.id} />
        )
    }, [props.id])

    const returnToWorkout = useCallback(() => {
        analytics.trackEvent("return_to_workout_pressed")
        Alert.alert(
            "",
            __t("workouts.return"),
            [
                {text: __t("cancel")},
                {
                    text: __t("continue"),
                    onPress: (): void => {
                        analytics.trackEvent("return_to_workout_approved", {
                            return_date: new Date(timestamp).toISOString(),
                        })
                        workoutsStore.startWorkout(props.id)
                    },
                },
            ],
            {cancelable: false},
        )
    }, [timestamp, workoutsStore, props.id])

    const epoch = new Date(timestamp)

    return (
        <View style={props.id == workoutsStore.current ? style.current : style.list}>
            <View style={staticStyles.header}>
                <View style={staticStyles.row}>
                    <Span style={staticStyles.day}>{__day(epoch)}</Span>
                    <Span>{__date(epoch)}</Span>
                </View>
                {workoutsStore.current !== props.id && (
                    <TouchableOpacity
                        hitSlop={layout.hitSlop}
                        onPress={returnToWorkout}>
                        <MaterialIcons
                            color={textColor}
                            name="replay"
                            size={20} />
                    </TouchableOpacity>
                )}
            </View>
            {skills.map(renderSkill)}
        </View>
    )
})
