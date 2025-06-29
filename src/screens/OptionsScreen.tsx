import {type ReactElement} from "react"
import {View} from "react-native"

import {Button} from "../components/Button"
import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"
import type {HomeStackParamList, NavigationProps} from "../navigation/types"

const styles = createStaticStyles({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
})

export function OptionsScreen({navigation}: NavigationProps<HomeStackParamList, "OptionsScreen">): ReactElement {
    return (
        <Screen>
            <Header title={__t("optionsScreen.title")} />
            <View style={styles.root}>
                <Span>{__t("optionsScreen.options.weightUnits")}</Span>
                <Span>{__t("optionsScreen.options.locale")}</Span>
                <Span>{__t("optionsScreen.options.warmupApproaches")}</Span>
                <Button onPress={(): void => {navigation.navigate("AboutScreen", undefined)}}>
                    About
                </Button>
                <Button
                    onPress={() => undefined}>
                    RESET
                </Button>
            </View>
        </Screen>
    )
}
