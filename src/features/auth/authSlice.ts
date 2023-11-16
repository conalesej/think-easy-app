import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthLoginInput, AuthSignUpInput, AuthTokens } from "./types";

export interface AuthState {
  authTokens: AuthTokens;
  authLoginInput: AuthLoginInput;
  authSignUpInput: AuthSignUpInput;
}

const initialState: AuthState = {
  authTokens: { accessToken: "", refreshToken: "" },
  authLoginInput: { email: "", password: "" },
  authSignUpInput: { email: "", password: "", firstName: "", lastName: "" },
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Write shit here
    },
  },
});

export const { increment } = authSlice.actions;

export default authSlice.reducer;
