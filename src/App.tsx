import {ReactElement} from "react"

import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"
import * as Sentry from "sentry-expo"

import useBootstrapApp from "./bootstrap/useBootstrapApp"
import StatusBar from "./components/StatusBar"
import Navigation from "./navigation/Navigation"
import {persistor, store} from "./store"


Sentry.init({
  dsn: "https://96d0fbde6d7f4a6e914a2b99effcb740@o409311.ingest.sentry.io/4504582925254656",
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})


function App(): ReactElement | null {
  const isLoadingComplete = useBootstrapApp()

  if (!isLoadingComplete) {
    return null
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar />
        <Navigation />
      </PersistGate>
    </Provider>
  )
}

export default App
