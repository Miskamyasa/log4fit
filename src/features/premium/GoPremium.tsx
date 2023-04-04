import {memo, ReactElement, useCallback, useState} from "react"
import {TextStyle} from "react-native"

import {get} from "lodash"

import Button from "../../components/Button"
import Card from "../../components/Card"
import Div from "../../components/Div"
import Loader from "../../components/Loader"
import Modal from "../../components/Modal"
import Span from "../../components/Span"
import {buttons} from "../../constants/defaultStyles"
import layout from "../../constants/layout"
import analytics from "../../helpers/analytics"
import createStaticStyles from "../../helpers/createStaticStyles"
import offering from "../../helpers/offering"
import useBoolean from "../../hooks/useBoolean"
import {__t} from "../../i18"
import {navigation} from "../../navigation/config"
import {useAppDispatch, useAppSelector} from "../../store"
import {fetchIsPayed, fetchOffering} from "../../store/offering/actions"
import {selectCurrentOffering} from "../../store/offering/selectors"

import SuccessPayment from "./SuccessPayment"


const text = (style?: TextStyle): TextStyle => ({
    fontSize: 20,
    textAlign: "center",
    ...style,
})

const staticStyles = createStaticStyles({
    root: {
        height: layout.height - 100,
        padding: layout.gap * 3,
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: text(),
    text: text({
        marginTop: layout.gap,
    }),
    price: text({
        fontSize: 24,
        fontWeight: "600",
        marginTop: layout.gap,
    }),
    loader: {
        marginVertical: layout.gap,
        height: 50,
    },
    buttons : {
        flex: 0.5,
        justifyContent: "space-evenly",
    },
    goBack: {
        ...buttons,
    },
})

function GoPremium(): ReactElement {
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch()
    const currentOffering = useAppSelector(selectCurrentOffering)

    const [visible, openSuccessModal, closeModal] = useBoolean(false)

    const closeSuccessModal = useCallback(() => {
        closeModal()
        navigation.navigate("HomeScreen", undefined)
    }, [closeModal])

    const handleRestore = useCallback(() => {
        setLoading(true)
        void offering.restore().then((isPayed) => {
            if (isPayed) {
                openSuccessModal()
            }
            setLoading(false)
        })
    }, [openSuccessModal])

    const handlePurchase = useCallback(() => {
        setLoading(true)
        if (currentOffering) {
            void offering.purchase(currentOffering)
                .then((isPayed) => {
                    dispatch(fetchIsPayed())
                    if (isPayed) {
                        analytics.sendEvent("success_payment")
                        openSuccessModal()
                    }
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            dispatch(fetchOffering())
            setLoading(false)
        }
    }, [currentOffering, dispatch, openSuccessModal])

    // TODO implement suspend
    // const handleSuspend = useCallback(() => {
    //   // ..
    // }, [])

    return (
        <Div style={staticStyles.root}>

            <Div style={staticStyles.header}>
                <Card
                    colorName={"dimmedBackground"}
                    maxWidth={layout.width * 0.8}>
                    <Span style={staticStyles.headerText}>
                        {__t("premiumBenefits.first")}
                    </Span>
                </Card>
                <Card>
                    <Span style={staticStyles.text}>
                        {__t("premiumScreen.trialText")}
                    </Span>
                    <Span style={staticStyles.price}>
                        {get(currentOffering, "product.priceString")}
                    </Span>
                </Card>

                <Div style={staticStyles.loader}>
                    {loading && <Loader />}
                </Div>

                <Modal
                    closeModal={closeSuccessModal}
                    visible={visible}>
                    <SuccessPayment dismiss={closeSuccessModal} />
                </Modal>

            </Div>

            <Div style={staticStyles.buttons}>
                <Button onPress={handleRestore}>
                    {__t("premiumScreen.restorePurchases")}
                </Button>

                <Button onPress={handlePurchase}>
                    {__t("premiumScreen.purchasePremium")}
                </Button>
            </Div>


            {/* TODO implement suspend */}
            {/*{payed ? (*/}
            {/*  <Button onPress={handleSuspend}>*/}
            {/*    {`😳  ${__t("premiumScreen.suspendPremium")}`}*/}
            {/*  </Button>*/}
            {/*) : null}*/}
        </Div>
    )
}

export default memo(GoPremium)
