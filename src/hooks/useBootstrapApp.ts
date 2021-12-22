import {useEffect, useState} from "react";
import * as Font from "expo-font";
import NetInfo from "@react-native-community/netinfo";
import * as Updates from "expo-updates";
import * as SplashScreen from "expo-splash-screen";
import {Alert} from "react-native";
import Constants from "expo-constants";
import {__t} from "../i18";
import {ExtraAppConfig} from "../types/extra";


async function loadResourcesAndDataAsync(onDone: () => void): Promise<void> {
  try {
    await Font.loadAsync({});
  } catch (e) {
    // We might want to provide this error information to an error reporting service
    // ...
  } finally {
    onDone();
  }
}

async function versionCheck(): Promise<void> {
  if (__DEV__) {
    return;
  }
  const {isConnected} = await NetInfo.fetch();
  if (isConnected) {
    const {isAvailable} = await Updates.checkForUpdateAsync();
    if (isAvailable) {
      const update = await Updates.fetchUpdateAsync();
      if (update.isNew) {
        Alert.alert("", __t("newVersion.modalText"), [
          {text: __t("continue")},
          {text: __t("update"), onPress: (): void => void Updates.reloadAsync()},
        ], {cancelable: false});
      }
    }
  }
}


function useBootstrapApp(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const {VERSION_CHECK_TIMEOUT = 1000} = Constants.manifest?.extra as ExtraAppConfig || {};

  useEffect(() => {
    void SplashScreen.preventAutoHideAsync();
    void loadResourcesAndDataAsync(() => {
      setTimeout(() => void versionCheck(), VERSION_CHECK_TIMEOUT);
      void SplashScreen.hideAsync();
      setLoadingComplete(true);
    });
  }, []);

  return isLoadingComplete;
}

export default useBootstrapApp;

