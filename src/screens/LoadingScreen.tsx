import {useEffect, useRef} from "react"
import {Alert} from "react-native"

import {useAuth} from "@clerk/clerk-expo"
import {observer} from "mobx-react"

import {Div} from "../components/Div"
import {Loader} from "../components/Loader"
import {Screen} from "../components/Screen"
import {analytics} from "../helpers/analytics"
import {createStaticStyles} from "../helpers/createStaticStyles"
import {__t} from "../helpers/i18n"
import {useNavigate} from "../navigation/useNavigate"
import {useStores} from "../store/useStores"

const staticStyles = createStaticStyles({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export const LoadingScreen = observer(function LoadingScreen() {
  const home = useNavigate("Home", true)

  const stores = useStores()
  const {appStateStore} = stores

  const {getToken, isSignedIn, isLoaded} = useAuth()

  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    stores.networkStore.setTokenGetter(() => getToken())
    void stores.init()
  }, [getToken, stores])

  useEffect(() => {
    if (appStateStore.storesReady && isLoaded) {
      home(undefined)
      return
    }
    const timer = setTimeout(() => {
      Alert.alert(__t("errors.generic"), __t("errors.tryAgainLater"),
        [
          {text: __t("reload")},
        ],
      )
      analytics.trackError(new Error("Loading screen error happened"))
    }, 5000)
    return (): void => {clearTimeout(timer)}
  }, [appStateStore.storesReady, home, isLoaded, isSignedIn])

  return (
    <Screen>
      <Div style={staticStyles.root}>
        <Loader />
      </Div>
    </Screen>
  )
})
