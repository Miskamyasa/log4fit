import {useCallback, useState} from "react"
import {Alert, ImageBackground, View} from "react-native"

import {useAuth} from "@clerk/expo"
import * as WebBrowser from "expo-web-browser"

import {images} from "../../assets/images"
import {Button} from "../components/Button"
import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {appVersion} from "../constants/common"
import {layout} from "../constants/layout"
import {analytics} from "../helpers/analytics"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"
import {storage} from "../helpers/storage"
import {useStores} from "../store/useStores"

const styles = createStaticStyles({
  background: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    paddingTop: 40,
  },
  version: {
    position: "absolute",
    bottom: layout.xSafe,
  },
  button: {
    position: "absolute",
    bottom: layout.xSafe + 48,
    minWidth: 160,
  },
})

export function AboutScreen() {
  const stores = useStores()
  const {isSignedIn, signOut} = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLogout = useCallback(async (): Promise<void> => {
    if (loading) {
      return
    }
    setLoading(true)
    try {
      await Promise.all([
        signOut(),
        storage.clearAppStorage(),
        WebBrowser.coolDownAsync(),
      ])
      stores.resetForLogout()
    }
    catch (error: unknown) {
      analytics.trackError(error, {source: "AboutScreen.handleLogout"})
      Alert.alert(__t("errors.generic"), __t("aboutScreen.logoutError"))
    }
    finally {
      setLoading(false)
    }
  }, [loading, signOut, stores])

  return (
    <Screen>
      <Header title={__t("aboutScreen.title")} />
      <ImageBackground
        blurRadius={10}
        resizeMode="cover"
        source={images.splash}
        style={styles.background}>
        <View style={styles.title}>
          <Span
            center
            size={32}
            weight="900">
            {__t("CFBundleDisplayName")}
          </Span>
        </View>
        <View style={styles.version}>
          <Span
            center
            size={16}>
            {appVersion}
          </Span>
        </View>
        {isSignedIn ? (
          <Button
            disabled={loading}
            style={styles.button}
            onPress={handleLogout}>
            {__t("aboutScreen.logout")}
          </Button>
        ) : null}
      </ImageBackground>
    </Screen>
  )
}
