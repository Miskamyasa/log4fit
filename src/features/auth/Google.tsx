import {useCallback} from "react"
import {Alert} from "react-native"

import {useOAuth} from "@clerk/clerk-expo"
import * as Linking from "expo-linking"
import * as WebBrowser from "expo-web-browser"
import {get} from "lodash"

import {Button} from "../../components/Button"
import {analytics} from "../../helpers/analytics"
import {__t} from "../../helpers/i18n"
import {useNavigate} from "../../navigation/useNavigate"

const GOOGLE_OAUTH_CALLBACK_PATH = "oauth-native-callback"

WebBrowser.maybeCompleteAuthSession()

export function GoogleAuthButton() {
  const home = useNavigate("HomeScreen")

  const {startOAuthFlow} = useOAuth({strategy: "oauth_google"})

  const handleGoogleSignIn = useCallback(async (): Promise<void> => {
    try {
      const redirectUrl = Linking.createURL(GOOGLE_OAUTH_CALLBACK_PATH)

      const {createdSessionId, setActive} = await startOAuthFlow({redirectUrl})

      if (createdSessionId && setActive) {
        await setActive({session: createdSessionId})
        home(undefined)
      }
    }
    catch (err: unknown) {
      const code: unknown = get(err, "code", "")
      if (code === "ERR_REQUEST_CANCELED") return

      Alert.alert("Error", __t("authScreen.signInError"))
      analytics.trackError(err)
    }
  }, [startOAuthFlow, home])

  return <Button onPress={handleGoogleSignIn}>Google</Button>
}
