import {Platform} from "react-native"

import Purchases, {LOG_LEVEL, PurchasesConfiguration} from "react-native-purchases"

import ErrorHandler from "./ErrorHandler"


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


class Offering {
  async init(): Promise<boolean> {
    try {
      await Purchases.setLogLevel(LOG_LEVEL.DEBUG)
      Purchases.configure(config)
      return true
    } catch (error) {
      ErrorHandler(error)
      return false
    }
  }
}


const offering = new Offering()

export default offering
