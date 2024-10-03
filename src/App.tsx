
import {initialWindowMetrics, SafeAreaProvider} from "react-native-safe-area-context"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"

import {Popups} from "./components/popups/Popups"
import {useBootstrapApp} from "./hooks/useBootstrapApp"
import {Navigation} from "./navigation/Navigation"
import {persistor, store} from "./store"
import {StoresProvider} from "./store/StoresProvider"

export function App() {
    const isLoadingComplete = useBootstrapApp()

    if (!isLoadingComplete) {
        return null
    }

    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <StoresProvider>
                <Provider store={store}>
                    <PersistGate
                        loading={null}
                        persistor={persistor}>
                        <Navigation />
                        <Popups />
                    </PersistGate>
                </Provider>
            </StoresProvider>
        </SafeAreaProvider>
    )
}
