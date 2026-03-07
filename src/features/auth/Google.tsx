import {useCallback} from "react"
import {Alert} from "react-native"

import {useSSO} from "@clerk/clerk-expo"
import {get} from "lodash"

import {Button} from "../../components/Button"
import {analytics} from "../../helpers/analytics"
import {__t} from "../../helpers/i18n"
import {useNavigate} from "../../navigation/useNavigate"

export function GoogleAuthButton() {
  const home = useNavigate("HomeScreen", true)

  const {startSSOFlow} = useSSO()

  const handleGoogleSignIn = useCallback(async (): Promise<void> => {
    try {
      const    {createdSessionId, setActive} = await startSSOFlow({strategy: "oauth_google"})
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
  }, [startSSOFlow, home])

  return <Button onPress={handleGoogleSignIn}>Google</Button>
}
