import {useEffect} from "react"
import {Alert} from "react-native"

import {observer} from "mobx-react"

import {Div} from "../components/Div"
import {Loader} from "../components/Loader"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {analytics} from "../helpers/analytics"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"
import {useNavigate} from "../navigation/useNavigate"
import {useStores} from "../store/useStores"

const staticStyles = createStaticStyles({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export const LoadingScreen = observer(function LoadingScreen() {
    const goHome = useNavigate("Home")

    const {appStateStore} = useStores()

    useEffect(() => {
        if (appStateStore.storesReady) {
            goHome(undefined)
            return
        }
        const timer = setTimeout(() => {

            Alert.alert(__t("errors.generic"), __t("errors.tryAgainLater"),
                [
                    {text: __t("reload")},
                ],
            )
            analytics.trackError(new Error("Loading screen error happened"))
        }, 5000)
        return (): void => {clearTimeout(timer)}
    }, [appStateStore.storesReady, goHome])

    return (
        <Screen>
            <Div style={staticStyles.root}>
                <Span>some text</Span>
                <Loader />
            </Div>
        </Screen>
    )
})
