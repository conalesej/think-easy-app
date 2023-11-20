import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { AuthLoginInput, AuthLoginResponse, AuthTokens } from "./types";
import { authApi } from "./api";

export interface AuthState {
  authTokens: AuthTokens;
  authLoginInput: AuthLoginInput;
  authLoginResponse: AuthLoginResponse;
  shouldRevalidateToken: boolean;
}

const initialState: AuthState = {
  authTokens: { accessToken: "", refreshToken: "" },
  authLoginInput: { email: "", password: "" },
  authLoginResponse: {
    accessToken: "",
    refreshToken: "",
    user: {
      email: "",
      firstname: "",
      lastname: "",
      createdAt: "",
      id: "",
      role: "",
      updatedAt: "",
      password: "",
    },
  },
  shouldRevalidateToken: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    clearAuthTokens: (state) => {
      state.authTokens = { accessToken: "", refreshToken: "" };
      state.authLoginResponse = {
        accessToken: "",
        refreshToken: "",
        user: {
          email: "",
          firstname: "",
          lastname: "",
          createdAt: "",
          id: "",
          role: "",
          updatedAt: "",
          password: "",
        },
      };
    },
    setEmail: (state, { payload }) => {
      state.authLoginInput.email = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.postLogin.matchFulfilled,
        (state, action) => {
          const { payload } = action;
          state.authLoginResponse = payload;
          state.authTokens = {
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
          };
        }
      )
      .addMatcher(
        authApi.endpoints.postRefreshToken.matchFulfilled,
        (state, action) => {
          const { payload } = action;
          toast.success("🔒 Token Refreshed!");
          state.authTokens.accessToken = payload.access_token;
          state.shouldRevalidateToken = false;
        }
      )
      .addMatcher(authApi.endpoints.postRefreshToken.matchRejected, (state) => {
        toast.dismiss();
        state.shouldRevalidateToken = false;
      });
  },
});

export const { clearAuthTokens, setEmail } = authSlice.actions;

export default authSlice.reducer;
