import {useEffect} from "react"
import {View} from "react-native"

import {useAuth} from "@clerk/clerk-expo"

import {Header} from "../components/Header"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {appVersion} from "../constants/common"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"

const styles = createStaticStyles({
  version: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

      <View style={styles.version}>
        <Span>{__t("CFBundleDisplayName")}</Span>
        <Span>
          {appVersion}
        </Span>
      </View>
    </Screen>
  )
}
