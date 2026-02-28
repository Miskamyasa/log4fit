import {useEffect, useRef} from "react"

import {useAuth} from "@clerk/clerk-expo"
import {observer} from "mobx-react"

import {Div} from "../components/Div"
import {Loader} from "../components/Loader"
import {Screen} from "../components/Screen"
import {createStaticStyles} from "../helpers/createStaticStyles"
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
    }
  }, [appStateStore.storesReady, home, isLoaded, isSignedIn])

  return (
    <Screen>
      <Div style={staticStyles.root}>
        <Loader />
      </Div>
    </Screen>
  )
})
