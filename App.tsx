import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store, persistor } from "./store";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "./components/Loading";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
