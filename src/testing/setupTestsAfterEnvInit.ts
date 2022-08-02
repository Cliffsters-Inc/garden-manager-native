import { store, persistor } from "../store";

global.afterEach(() => persistor.purge());
global.afterEach(() => store.dispatch({ type: "RESET_STORE" }));
