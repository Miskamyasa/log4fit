import {Alert} from "react-native"

import * as Updates from "expo-updates"


import {__t} from "../i18"


function ErrorHandler(err: unknown): void {
  console.warn(err)
  return Alert.alert("", "Error", [
    {text: __t("reload"), onPress: (): void => void Updates.reloadAsync()},
  ])
}

export default ErrorHandler
