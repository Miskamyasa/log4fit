import {ReactElement} from "react";
import {Provider} from "react-redux";

import {PersistGate} from "redux-persist/integration/react";

import useBootstrapApp from "./bootstrap/useBootstrapApp";
import StatusBar from "./components/StatusBar";
import Navigation from "./navigation/Navigation";
import {persistor, store} from "./store";


function App(): ReactElement | null {
  const isLoadingComplete = useBootstrapApp();

  if (!isLoadingComplete) {
    return null;
  }

  store.subscribe(() => {
    const state = store.getState().currentWorkout;
    console.log("\x1b[33m%s\x1b[0m", `CurrentWorkout: ${JSON.stringify(state, null, 2)}`);
  });

  return (
    <Provider store={store}>
      <PersistGate
        loading={null /* TODO: make root app loader */}
        persistor={persistor}>
        <StatusBar />
        <Navigation />
      </PersistGate>
    </Provider>
  );
}

export default App;
