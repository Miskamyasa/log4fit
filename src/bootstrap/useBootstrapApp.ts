import {useEffect, useState} from "react"
import {Alert} from "react-native"

import NetInfo from "@react-native-community/netinfo"
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import * as Updates from "expo-updates"

import {__t} from "../i18"


async function loadResourcesAndDataAsync(onDone: () => void): Promise<void> {
  try {
    await Font.loadAsync({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    })
  } catch (e) {
    // We might want to provide this error information to an error reporting service
    // ...
  } finally {
    onDone()
  }
}

async function versionCheck(): Promise<void> {
  if (__DEV__) {
    return
  }
  const {isConnected} = await NetInfo.fetch()
  if (isConnected) {
    const {isAvailable} = await Updates.checkForUpdateAsync()
    if (isAvailable) {
      const update = await Updates.fetchUpdateAsync()
      if (update.isNew) {
        Alert.alert("", __t("newVersion.modalText"), [
          {text: __t("continue")},
          {text: __t("update"), onPress: (): void => void Updates.reloadAsync()},
        ], {cancelable: false})
      }
    }
  }
}


function useBootstrapApp(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    void SplashScreen.preventAutoHideAsync()
    void loadResourcesAndDataAsync(() => {
      setTimeout(() => void versionCheck(), 3000)
      void SplashScreen.hideAsync()
      setLoadingComplete(true)
    })
  }, [])

  return isLoadingComplete
}

export default useBootstrapApp
