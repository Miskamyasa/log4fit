import {ReactElement} from "react"

import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"

import StatusBar from "./components/StatusBar"
import useBootstrapApp from "./hooks/useBootstrapApp"
import Navigation from "./navigation/Navigation"
import {persistor, store} from "./store"


function App(): ReactElement | null {
    const isLoadingComplete = useBootstrapApp()

    if (!isLoadingComplete) {
        return null
    }

    return (
        <Provider store={store}>
            <StatusBar />
            <PersistGate
                loading={null}
                persistor={persistor}>
                <Navigation />
            </PersistGate>
        </Provider>
    )
}

export default App
