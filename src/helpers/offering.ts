import {Platform} from "react-native"

import Purchases, {CustomerInfo, PurchasesConfiguration, PurchasesPackage} from "react-native-purchases"

import analytics from "./analytics"
import errorHandler from "./errorHandler"


export type {PurchasesPackage}

const API_KEYS = Object.freeze({
  // TODO: Replace with APPLE API key
  APPLE: "xxx",
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
  async init(): Promise<void> {
    // await Purchases.setLogLevel(LOG_LEVEL.DEBUG)
    return Promise.resolve(Purchases.configure(config))
  }

  async isPayed(): Promise<boolean> {
    try {
      const customerInfo: CustomerInfo = await Purchases.getCustomerInfo()
      return isPayedCheck(customerInfo)
    } catch (err) {
      errorHandler(err)
      return false
    }
  }

  async getOffering(): Promise<PurchasesPackage | undefined> {
    try {
      const {current} = await Purchases.getOfferings()
      if (current && current.availablePackages?.length !== 0) {
        return current.availablePackages[0]
      }
    } catch (err) {
      errorHandler(err)
    }
  }

  async restore(): Promise<boolean | undefined> {
    try {
      const customerInfo = await Purchases.restorePurchases()
      return isPayedCheck(customerInfo)
    } catch (err) {
      errorHandler(err)
    }
  }

  async purchase(currentOffering: PurchasesPackage): Promise<boolean | undefined> {
    try {
      const {customerInfo} = await Purchases.purchasePackage(currentOffering)
      return isPayedCheck(customerInfo)
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
