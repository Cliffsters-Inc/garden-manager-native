import { Provider } from "react-redux";
import { store, persistor } from "../store";
import Navigation from "../navigation";
import useColorScheme from "../hooks/useColorScheme";
import { PersistGate } from "redux-persist/integration/react";

export const ProviderMock = () => {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation colorScheme={colorScheme} />
      </PersistGate>
    </Provider>
  );
};
