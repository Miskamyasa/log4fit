import type {ReactElement} from "react"

import * as Updates from "expo-updates"

import {Button} from "../components/Button"
import {Div} from "../components/Div"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"

const styles = createStaticStyles({
    content: {
        paddingVertical: 14,
        alignItems: "center",
    },
})

export function ErrorScreen(): ReactElement {
    return (
        <Screen>
            <Div style={styles.content}>
                <Span>
                    {__t("errors.generic")}
                </Span>
                <Span>
                    {__t("errors.tryAgainLater")}
                </Span>
                <Button
                    onPress={() => {
                        void Updates.reloadAsync()
                    }}>
                    {__t("reload")}
                </Button>
            </Div>
        </Screen>
    )
}
