import {useCallback, type ReactElement} from "react"
import {Alert} from "react-native"

import {useOAuth} from "@clerk/clerk-expo"
import * as Linking from "expo-linking"
import {get} from "lodash"

import {Button} from "../../components/Button"
import {analytics} from "../../helpers/analytics"
import {__t} from "../../helpers/i18n"
import {useNavigate} from "../../navigation/useNavigate"

export function GoogleAuthButton(): ReactElement {
  const home = useNavigate("HomeScreen")

  const {startOAuthFlow} = useOAuth({strategy: "oauth_google"})

  const handleGoogleSignIn = useCallback(async (): Promise<void> => {
    try {
      // if you use expo-router, this might be Linking.createURL("/(tabs)") etc.
      const redirectUrl = Linking.createURL("/")

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
