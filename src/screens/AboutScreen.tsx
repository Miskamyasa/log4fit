import type {ReactElement} from "react"
import {View} from "react-native"

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

export function AboutScreen(): ReactElement {
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
