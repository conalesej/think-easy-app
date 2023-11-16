import { configureStore } from "@reduxjs/toolkit";

import postReducer from "./features/post/postSlice";
import { postApi } from "./features/post/api";

export const store = configureStore({
  reducer: {
    post: postReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
