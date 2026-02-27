import {useCallback, type ReactElement} from "react"
import {Alert} from "react-native"

import {useSignInWithApple} from "@clerk/clerk-expo"
import {get} from "lodash"

import {Button} from "../../components/Button"
import {analytics} from "../../helpers/analytics"
import {__t} from "../../helpers/i18n"
import {useNavigate} from "../../navigation/useNavigate"

export function AppleAuthButton(): ReactElement {
  const home = useNavigate("HomeScreen")

  const {startAppleAuthenticationFlow} = useSignInWithApple()

  const handleAppleSignIn = useCallback(async (): Promise<void> => {
    try {
      const {createdSessionId, setActive} = await startAppleAuthenticationFlow()
      if (createdSessionId && setActive) {
        await setActive({session: createdSessionId})
        home(undefined)
      }
    } catch (err: unknown) {
      const code: unknown = get(err, "code", "")
      if (code === "ERR_REQUEST_CANCELED") {
        return
      }
      Alert.alert("Error", __t("authScreen.signInError"))
      analytics.trackError(err)
    }
  }, [startAppleAuthenticationFlow, home])

  return (
    <Button onPress={handleAppleSignIn}>
      Apple
    </Button>
  )
}
