import type {ReactElement} from "react"

import {Button} from "../components/Button"
import {Div} from "../components/Div"
import {Screen} from "../components/Screen"
import {Span} from "../components/Span"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"
// import {useNavigate} from "../navigation/useNavigate"
import {useStores} from "../store/useStores"

const styles = createStaticStyles({
  content: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 50,
    justifyContent: "center",
    alignItems: "center",
  },
})

export function WelcomeScreen(): ReactElement {
  const {welcomeStore} = useStores()

  const goNext = (): void => {
    welcomeStore.setWelcome(false)
  }

  return (
    <Screen>
      <Div style={styles.content}>
        <Span
          center
          size={16}
          weight="600">
          {__t("welcomeScreen.title")}
        </Span>
        <Span
          center
          size={16}
          weight="400">
          {__t("welcomeScreen.description")}
        </Span>
        <Button
          onPress={goNext}>
          {__t("continue")}
        </Button>
      </Div>
    </Screen>
  )
}
