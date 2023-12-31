import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthLoginInput,
  AuthLoginResponse,
  AuthRefreshTokenInput,
  AuthRefreshTokenResponse,
  AuthSignUpInput,
  AuthSignUpResponse,
} from "./types";
import { RootState } from "../../store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL_AUTH,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.authTokens.accessToken;
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    postSignUp: builder.mutation<AuthSignUpResponse, AuthSignUpInput>({
      query: ({ email, password, firstname, lastname }) => ({
        url: `/signup`,
        method: "POST",

        body: { email, password, firstname, lastname },
      }),
    }),
    postLogin: builder.mutation<AuthLoginResponse, AuthLoginInput>({
      query: ({ email, password }) => ({
        url: `/login`,
        method: "POST",

        body: { email, password },
      }),
    }),
    // prettier-ignore
    postRefreshToken: builder.mutation<AuthRefreshTokenResponse,AuthRefreshTokenInput>({
      query: ({ token }) => {

        return {
          url: `/refresh-token`,
          method: "POST",
  
          body: { token:token },
        }
      },
    }),
  }),
});

export const {
  usePostSignUpMutation,
  usePostLoginMutation,
  usePostRefreshTokenMutation,
} = authApi;
