import { configureStore } from "@reduxjs/toolkit";
import walletsReducer from "./wallets/wallets-slice";
import authReducer from "./auth/auth-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallets: walletsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
