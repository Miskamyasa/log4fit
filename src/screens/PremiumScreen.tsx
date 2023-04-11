import {ReactElement, useEffect} from "react"


import Header from "../components/Header"
import Loader from "../components/Loader"
import Screen from "../components/Screen"
import GoPremium from "../features/premium/GoPremium"
import {__t} from "../helpers/i18n"
import {useAppDispatch, useAppSelector} from "../store"
import {fetchOffering} from "../store/offering/actions"
import {selectOfferingLoading} from "../store/offering/selectors"


function PremiumScreen(): ReactElement {
    const loading = useAppSelector(selectOfferingLoading)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchOffering())
    }, [dispatch])

    return (
        <Screen>
            <Header title={__t("premiumScreen.title")} />
            {loading ? (
                <Loader />
            ) : (
                <GoPremium />
            )}
        </Screen>
    )
}

export default PremiumScreen
