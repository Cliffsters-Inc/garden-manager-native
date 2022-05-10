import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "../navigation";
import {
  render as rtlRender,
  RenderOptions,
} from "@testing-library/react-native";

const render = (
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  options?: RenderOptions | undefined
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );

  return rtlRender(component, { wrapper: Wrapper, ...options });
};

const renderApp = () => render(<Navigation colorScheme="light" />);

export * from "@testing-library/react-native";
// overrides render with our own wrapped with redux store
export { render, renderApp };
