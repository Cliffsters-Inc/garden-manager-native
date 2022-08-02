import AsyncStorage from "@react-native-async-storage/async-storage";
import { AnyAction, combineReducers, ThunkAction } from "@reduxjs/toolkit";
import {
  addListener,
  configureStore,
  createListenerMiddleware,
  ListenerEffectAPI,
  TypedAddListener,
  TypedStartListening,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { bedSlice } from "./features/bed/bed.slice";
import { gardenSlice } from "./features/garden/garden.slice";
import { logSlice } from "./features/log/log.slice";
import { photoSlice } from "./features/photos/photos.slice";
import { veggieSlice } from "./features/veggie/veggie.slice";
import { veggieInfoSlice } from "./features/veggieInfo/veggieInfoSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  [gardenSlice.name]: gardenSlice.reducer,
  [bedSlice.name]: bedSlice.reducer,
  [veggieSlice.name]: veggieSlice.reducer,
  [logSlice.name]: logSlice.reducer,
  [veggieInfoSlice.name]: veggieInfoSlice.reducer,
  [photoSlice.name]: photoSlice.reducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === "RESET_STORE") {
    return appReducer(undefined, { type: undefined });
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const listenerMiddlewareInstance = createListenerMiddleware({
  onError: () => console.error,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listenerMiddlewareInstance.middleware),
});

let persistor = persistStore(store);

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddlewareInstance.startListening as AppStartListening;
export const addAppListener = addListener as AppAddListener;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
