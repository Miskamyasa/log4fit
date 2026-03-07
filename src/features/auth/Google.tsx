import {useCallback} from "react"
import {Alert} from "react-native"

import {useSSO} from "@clerk/expo"
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
      const result = await startSSOFlow({
        strategy: "oauth_google",
      })
      const {createdSessionId, setActive, signIn, signUp, authSessionResult} = result

      console.warn("SSO result:", JSON.stringify({
        createdSessionId,
        authSessionResultType: authSessionResult?.type,
        authSessionResultUrl: authSessionResult?.type === "success" ? authSessionResult.url : null,
        signInStatus: signIn?.status,
        signUpStatus: signUp?.status,
        firstFactorStatus: signIn?.firstFactorVerification?.status,
        externalVerificationRedirectURL: signIn?.firstFactorVerification?.externalVerificationRedirectURL?.toString(),
      }, null, 2))

      if (createdSessionId && setActive) {
        await setActive({session: createdSessionId})
        home(undefined)
      }
      else {
        console.error("Failed to create session")
      }
    }
    catch (err: unknown) {
      const code: unknown = get(err, "code", "")
      if (code === "ERR_REQUEST_CANCELED") {
        return
      }
      Alert.alert("Error", __t("authScreen.signInError"))
      analytics.trackError(err)
    }
  }, [home, startSSOFlow])

  return <Button onPress={handleGoogleSignIn}>Google</Button>
}
