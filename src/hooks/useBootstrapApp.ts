import {useEffect, useState} from "react"
import {Alert} from "react-native"

import NetInfo from "@react-native-community/netinfo"
import {Asset} from "expo-asset"
import * as SplashScreen from "expo-splash-screen"
import * as Updates from "expo-updates"

import {imagesToLoad} from "../../assets/images"
import {analytics} from "../helpers/analytics"
import {__t} from "../helpers/i18n"

async function loadResourcesAndDataAsync(onDone: () => void): Promise<void> {
    try {
        await Promise.all([
            Asset.loadAsync(imagesToLoad),
        ])
    }
    catch (e) {
        analytics.trackError(e)
    }
    finally {
        onDone()
    }
}

async function versionCheck(): Promise<void> {
    if (__DEV__) {
        return
    }
    // eslint-disable-next-line import/no-named-as-default-member
    const {isConnected} = await NetInfo.fetch()
    if (isConnected) {
        const {isAvailable} = await Updates.checkForUpdateAsync()
        if (isAvailable) {
            const update = await Updates.fetchUpdateAsync()
            if (update.isNew) {
                Alert.alert(
                    "",
                    __t("newVersion.modalText"),
                    [
                        {text: __t("continue")},
                        {text: __t("newVersion.update"), onPress: (): void => void Updates.reloadAsync()},
                    ],
                    {cancelable: false},
                )
            }
        }
    }
}

export function useBootstrapApp(): boolean {
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
