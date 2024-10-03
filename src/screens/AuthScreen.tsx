import {useCallback} from "react"

import {Button} from "../components/Button"
import {Div} from "../components/Div"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"
import {useStores} from "../store/useStores"

const styles = createStaticStyles({
    content: {
        flex: 1,
        paddingVertical: 14,
        gap: 40,
        justifyContent: "center",
        alignItems: "center",
    },
})

export function AuthScreen() {
    const {welcomeStore} = useStores()
    const skip = useCallback(() => {
        welcomeStore.setWelcome(true)
    }, [welcomeStore])

    return (
        <Screen>
            <Div style={styles.content}>
                <Span
                    center
                    size={18}
                    weight="600">
                    {__t("authScreen.title")}
                </Span>
                <Span
                    center
                    size={16}
                    weight="400">
                    {__t("authScreen.description")}
                </Span>
                <Button onPress={skip}>
                    {__t("skip")}
                </Button>
            </Div>
        </Screen>
    )
}
