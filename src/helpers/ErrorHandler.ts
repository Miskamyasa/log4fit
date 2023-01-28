import {Alert} from "react-native"

import * as Updates from "expo-updates"

import {__t} from "../i18"

import Sentry from "./Sentry"


function ErrorHandler(err: unknown): void {
  if (process.env.NODE_ENV !== "development") {
    Sentry.captureException(err)
  } else {
    console.warn(err)
  }

  return Alert.alert("", "Error", [
    {
      text: __t("reload"),
      onPress: (): void => void Updates.reloadAsync(),
    },
  ])
}

export default ErrorHandler
