import {useEffect} from "react"
import {Alert} from "react-native"

import {observer} from "mobx-react"

import {Div} from "../components/Div"
import Loader from "../components/Loader"
import {Screen} from "../components/Screen"
import {analytics} from "../helpers/analytics"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"
import type {NavigationProps, RootStackParamList} from "../navigation/types"
import {useAppDispatch, useAppSelector} from "../store"
import {fetchSkills} from "../store/skills/actions"
import {useStores} from "../store/useStores"

const staticStyles = createStaticStyles({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export const LoadingScreen = observer(function LoadingScreen(props: NavigationProps<RootStackParamList, "Loading">) {
    const {navigation} = props

    const {welcomeStore} = useStores()
    const dispatch = useAppDispatch()

    // 1️⃣ - FETCH DATA
    useEffect(() => {
        // Fetch skills
        dispatch(fetchSkills())
    }, [dispatch])

    const baseSkills = useAppSelector(state => state.skills.ids.base)

    // 2️⃣ - REDIRECT HOME
    useEffect(() => {
        // App ready to load
        if (welcomeStore.ready && baseSkills.length > 0) {
            navigation.replace("Home")
            return
        }
        const timer = setTimeout(() => {
            Alert.alert(__t("errors.generic"), __t("errors.tryAgainLater"),
                [
                    {text: __t("reload")},
                ],
            )
            analytics.sendError(new Error("Loading screen error happened"))
        }, 5000)
        return (): void => {
            clearTimeout(timer)
        }
    }, [navigation, baseSkills.length, welcomeStore.ready])

    return (
        <Screen>
            <Div style={staticStyles.root}>
                <Loader />
            </Div>
        </Screen>
    )
})
