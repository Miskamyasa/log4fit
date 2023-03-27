// import {Alert} from "react-native"

import crashlytics from "@react-native-firebase/crashlytics"

// import analytics from "./analytics"
// import * as Updates from "expo-updates"

// import {__t} from "../i18"


function errorHandler(err: unknown): void {
  if (!__DEV__) {
    crashlytics().recordError(err as Error)
    // analytics.sendEvent((err as Error).message)
  } else {
    if (typeof err === "object") {
      const obj = {...err}
      console.warn(JSON.stringify(obj, null, 2))
    }
    console.warn(err)
  }

  // return Alert.alert("Error", "Something wierd is happening", [
  //   {
  //     text: __t("reload"),
  //     onPress: !__DEV__
  //       ? (): void => void Updates.reloadAsync()
  //       : (): null => null,
  //   },
  // ], {cancelable: false})
}

export default errorHandler
