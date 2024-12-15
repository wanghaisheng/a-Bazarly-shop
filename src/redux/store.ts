import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import AuthReducer from "./features/auth/AuthSlice";
import CartReducer from "./features/cart/cartSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  PERSIST,
} from "redux-persist";

// Persistence configuration for auth
const persistConfig = {
  key: "auth",
  storage,
};

// Persistence configuration for cart
// const cartPersistConfig = {
//   key: "cart",
//   storage,
// };

const persistedAuthReducer = persistReducer(persistConfig, AuthReducer);
// const persistedCartReducer = persistReducer(cartPersistConfig, CartReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer, // Auth persistence
    cart: CartReducer, // Cart persistence
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST],
      },
    }).concat(baseApi.middleware),
});

// Redux necessary types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistore = persistStore(store);
