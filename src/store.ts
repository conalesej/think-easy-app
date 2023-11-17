import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import { authApi } from "./features/auth/api";

import postReducer from "./features/post/postSlice";
import { postApi } from "./features/post/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    post: postReducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
