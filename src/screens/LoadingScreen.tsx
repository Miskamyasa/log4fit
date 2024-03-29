import {ReactElement, useEffect} from "react"

import Div from "../components/Div"
import Loader from "../components/Loader"
import Screen from "../components/Screen"
import createStaticStyles from "../helpers/createStaticStyles"
import errorHandler from "../helpers/errorHandler"
import {HomeStackScreenProps} from "../navigation/types"
import {useAppDispatch, useAppSelector} from "../store"
import {fetchSkills} from "../store/skills/actions"


const staticStyles = createStaticStyles({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

function LoadingScreen({navigation}: HomeStackScreenProps<"LoadingScreen">): ReactElement {
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
        if (baseSkills.length > 0) {
            return navigation.replace("HomeScreen")
        }

        const timer = setTimeout(() => {
            errorHandler(new Error("Loading screen"))
        }, 5000)

        return (): void => {
            clearTimeout(timer)
        }

    }, [navigation, baseSkills.length])

    return (
        <Screen>
            <Div style={staticStyles.root}>
                <Loader />
            </Div>
        </Screen>
    )
}

export default LoadingScreen
