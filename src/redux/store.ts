import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import AuthReducer from "./features/auth/AuthSlice";
import CartReducer from "./features/cart/cartSlice";
import ComparisonReducer from "./features/comparison/comparisonSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  REHYDRATE,
  PERSIST,
} from "redux-persist";

// Persistence configuration for auth
const persistAuthConfig = {
  key: "auth",
  storage,
};

// Persistence configuration for cart
const persistCartConfig = {
  key: "cart",
  storage,
};

// Persistence configuration for cart
const persistComparisonConfig = {
  key: "comparison",
  storage,
};

// Persisted reducers
const persistedAuthReducer = persistReducer(persistAuthConfig, AuthReducer);
const persistedCartReducer = persistReducer(persistCartConfig, CartReducer);
const persistedComparisonReducer = persistReducer(
  persistComparisonConfig,
  ComparisonReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer, // Auth persistence
    cart: persistedCartReducer,
    comparison: persistedComparisonReducer, // Cart persistence
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
