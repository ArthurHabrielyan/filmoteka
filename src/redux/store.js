import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import moviesReducer from "./movies/movies-slice";

const authPersistConfig = {
  key: "movies",
  storage,
  whitelist: ["film"],
};

export const store = configureStore({
  reducer: {
    films: persistReducer(authPersistConfig, moviesReducer),
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
