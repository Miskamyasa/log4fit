import {useEffect, useState} from "react"
import {Alert} from "react-native"

import NetInfo from "@react-native-community/netinfo"
import {Asset} from "expo-asset"
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import * as Updates from "expo-updates"

import ErrorHandler from "../helpers/ErrorHandler"
import {__t} from "../i18"
import {imagesToLoad} from "../images"


async function loadResourcesAndDataAsync(onDone: () => void): Promise<void> {
  try {
    await Promise.all([
      Font.loadAsync({}),
      Asset.loadAsync(imagesToLoad),
    ])
  } catch (e) {
    ErrorHandler(e)
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
