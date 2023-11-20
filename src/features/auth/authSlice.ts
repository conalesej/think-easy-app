import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  AuthLoginInput,
  AuthLoginResponse,
  AuthSignUpInput,
  AuthTokens,
} from "./types";
import { authApi } from "./api";

export interface AuthState {
  authTokens: AuthTokens;
  authLoginInput: AuthLoginInput;
  authLoginResponse: AuthLoginResponse;
  shouldRevalidateToken: boolean;
  // authSignUpInput: AuthSignUpInput;
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
  // authSignUpInput: { email: "", password: "", firstname: "", lastname: "" },
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
    revalidateToken: (state) => {
      console.log("Revalidate mo na");
      state.shouldRevalidateToken = true;
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
          toast.dismiss();
          state.authTokens.accessToken = payload.access_token;
          state.shouldRevalidateToken = false;
        }
      );
  },
});

export const { clearAuthTokens, setEmail, revalidateToken } = authSlice.actions;

export default authSlice.reducer;
