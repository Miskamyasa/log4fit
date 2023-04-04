import {Platform} from "react-native"

import Purchases, {CustomerInfo, LOG_LEVEL, PurchasesConfiguration, PurchasesPackage} from "react-native-purchases"

import analytics from "./analytics"
import errorHandler from "./errorHandler"


export type {PurchasesPackage}

const API_KEYS = Object.freeze({
    // TODO: Replace with APPLE API key
    APPLE: "",
    GOOGLE: "goog_KZsCEIXZOSFtkbVgECgwpGNIKZb",
})

const config: PurchasesConfiguration = Object.freeze({
    apiKey: Platform.OS == "android"
        ? API_KEYS.GOOGLE
        : API_KEYS.APPLE,
})

function isPayedCheck(customerInfo: CustomerInfo): boolean {
    return (customerInfo && customerInfo.activeSubscriptions.length > 0)
}

class Offering {
    onError(err: unknown): void {
        let eventName = "payment_api_error"
        const {message} = err as Error || {}
        if (message === "Purchase was cancelled") {
            eventName = "purchase_cancelled"
        }
        analytics.sendEvent(eventName, {message})
    }

    async init(): Promise<void> {
        await Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.ERROR)
        Purchases.configure(config)
        return Promise.resolve()
    }

    async isPayed(): Promise<boolean> {
        try {
            if (await Purchases.isConfigured()) {
                const customerInfo: CustomerInfo = await Purchases.getCustomerInfo()
                return isPayedCheck(customerInfo)
            }
        } catch (err) {
            errorHandler(err)
        }
        return false
    }

    async getOffering(): Promise<PurchasesPackage | undefined> {
        try {
            if (await Purchases.isConfigured()) {
                const {current} = await Purchases.getOfferings()
                if (current && current.availablePackages?.length !== 0) {
                    return current.availablePackages[0]
                }
            }
        } catch (err) {
            errorHandler(err)
        }
    }

    async restore(): Promise<boolean | undefined> {
        try {
            if (await Purchases.isConfigured()) {
                const customerInfo = await Purchases.restorePurchases()
                return isPayedCheck(customerInfo)
            }
        } catch (err) {
            errorHandler(err)
        }
    }

    async purchase(currentOffering: PurchasesPackage): Promise<boolean | undefined> {
        try {
            if (await Purchases.isConfigured()) {
                const {customerInfo} = await Purchases.purchasePackage(currentOffering)
                return isPayedCheck(customerInfo)
            }
        } catch (err) {
            const {message} = err as {message: string} || {}
            if (message === "Purchase was cancelled") {
                analytics.sendEvent("purchase_cancelled")
                return
            }
            errorHandler(err)
        }
    }
}


const offering = new Offering()

export default offering
