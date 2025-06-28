import {useMemo, type ReactElement} from "react"
import {ScrollView, View} from "react-native"

// import {Image} from "expo-image"

import type {ThemeProps} from "../colors/types"
import {useThemeColor} from "../colors/useThemeColor"
import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
// import SkillImage from "../components/SkillImage"
import {Span} from "../components/Span"
import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__locale} from "../helpers/i18n"
import type {HomeStackParamList, NavigationProps} from "../navigation/types"
import {useStores} from "../store/useStores"

const colors: ThemeProps = {
    light: "#fefefe",
    dark: "rgba(14, 16, 18, 0.82)",
}

const staticStyles = createStaticStyles({
    container: {
        padding: layout.gap,
    },
    content: {
        minHeight: layout.height / 5,
        borderRadius: 15,
        overflow: "hidden",
        marginTop: layout.gap,
    },
    paddings: {
        padding: layout.gap * 1.4,
    },
})

export function SkillInfoScreen({route}: NavigationProps<HomeStackParamList, "SkillInfoScreen">): ReactElement {
    const {skillsStore} = useStores()
    const exercise = skillsStore.registry[route.params.id]

    const locale = __locale()

    const backgroundColor = useThemeColor("viewBackground", colors)
    const contentStyle = useMemo(() => {
        return [staticStyles.content, {backgroundColor}]
    }, [backgroundColor])

    return (
        <Screen>
            <Header title={exercise.title[locale]} />

            <ScrollView contentContainerStyle={staticStyles.container}>
                {/*
        {exercise.image ? (
          <SkillImage
            banner
            name={exercise.image} />
        ) : null} */}

                <View style={contentStyle}>
                    <View style={staticStyles.paddings}>
                        <Span size={16}>
                            {exercise.description[locale]}
                        </Span>
                    </View>
                </View>

            </ScrollView>

        </Screen>
    )
}
