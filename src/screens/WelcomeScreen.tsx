import {ReactElement, useCallback} from "react"

import {View} from "react-native"

import Button from "../components/Button"
import Screen from "../components/Screen"
import Span from "../components/Span"
import {__t} from "../i18"
import {WelcomeStackScreenProps} from "../navigation/types"


function WelcomeScreen({navigation}: WelcomeStackScreenProps<"WelcomeScreen">): ReactElement {
  const goNext = useCallback(() => navigation.navigate("AuthScreen", undefined), [navigation])

  return (
    <Screen>
      <View>
        <Span>{__t("welcomeScreen.title")}</Span>
      </View>
      <Button onPress={goNext}>
        {__t("continue")}
      </Button>
    </Screen>
  )
}

export default WelcomeScreen
