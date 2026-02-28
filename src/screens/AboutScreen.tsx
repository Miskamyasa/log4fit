import {useEffect} from "react"
import {ImageBackground, View} from "react-native"

import {useAuth} from "@clerk/clerk-expo"

import {images} from "../../assets/images"
import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {appVersion} from "../constants/common"
import {layout} from "../constants/layout"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"

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
})

export function AboutScreen() {
  const {isSignedIn, getToken} = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      const fetchToken = async (): Promise<void> => {
        try {
          const token = await getToken()
          void token
        } catch (error) {
          console.error("Error fetching token:", error)
        }
      }
      void fetchToken()
    }
  }, [isSignedIn, getToken])

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
      </ImageBackground>
    </Screen>
  )
}
