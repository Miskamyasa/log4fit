import {Alert} from "react-native"

import * as Updates from "expo-updates"

import {__t} from "../i18"

import Sentry from "./Sentry"


function ErrorHandler(err: unknown): void {
  if (!__DEV__) {
    Sentry.captureException(err)
  } else {
    console.warn(err)
  }

  return Alert.alert("", "Error", [
    {
      text: __t("reload"),
      onPress: !__DEV__
        ? (): void => void Updates.reloadAsync()
        : (): null => null,
    },
  ])
}

export default ErrorHandler
