// redux tootlkt configuration is done here

import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";

// create n eport store
export default configureStore({
  // provide configure store options
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
