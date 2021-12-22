import {ReactElement, useCallback, useState} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {get} from "lodash";
import {PersistGate} from "redux-persist/integration/react";

import StatusBar from "./components/StatusBar";
import useBootstrapApp from "./hooks/useBootstrapApp";
import {persistor, store} from "./store";
import createNavigation from "./navigation/createNavigation";

function Root(): ReactElement | null {
  const isLoadingComplete = useBootstrapApp();

  if (!isLoadingComplete) {
    return null;
  }

  const Navigation = createNavigation();

  return (
    <Provider store={store}>
      <PersistGate
        loading={null /* TODO: make root app loader */}
        persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar />
          <Navigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default Root;
