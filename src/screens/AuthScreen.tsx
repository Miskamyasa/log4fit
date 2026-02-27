import {useCallback, type ReactElement} from "react"
import {Platform} from "react-native"

import {useAuth, useSignUp} from "@clerk/clerk-expo"

import {Button} from "../components/Button"
import {Div} from "../components/Div"
import {Row} from "../components/Row"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {AppleAuthButton} from "../features/auth/Apple"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"
import {useNavigate} from "../navigation/useNavigate"
import { GoogleAuthButton } from "../features/auth/Google"

const styles = createStaticStyles({
  content: {
    flex: 1,
    paddingVertical: 14,
    gap: 40,
    justifyContent: "center",
    alignItems: "center",
  },
})

export function AuthScreen(): ReactElement {
  const {isSignedIn} = useAuth()
  const {isLoaded, signUp, setActive} = useSignUp()
  const home = useNavigate("HomeScreen")

  if (isSignedIn) {
    home(undefined)
  }

  const skip = useCallback(() => {
    console.log("skip auth")
  }, [])

  return (
    <Screen>
      <Div style={styles.content}>
        <Span
          center
          size={18}
          weight="600">
          {__t("authScreen.title")}
        </Span>
        <Span
          center
          size={16}
          weight="400">
          {__t("authScreen.description")}
        </Span>
        <Row gap={10}>
          <GoogleAuthButton />
          {Platform.OS == "ios" && isLoaded ? (
            <AppleAuthButton />
          ) : null}
        </Row>
        <Button onPress={skip}>
          {__t("skip")}
        </Button>
      </Div>
    </Screen>
  )
}
