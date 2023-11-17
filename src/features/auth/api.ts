import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AuthLoginInput,
  AuthLoginResponse,
  AuthSignUpInput,
  AuthSignUpResponse,
  AuthTokens,
} from "./types";
import { RootState } from "../../store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://frontend-test-be.stage.thinkeasy.cz/auth",
    // prepareHeaders: (headers, { getState }) => {
    //   // Retrieve the access token from wherever you have stored it
    //   const accessToken = (getState() as RootState).;

    //   if (accessToken) {
    //     headers.set("Authorization", `Bearer ${accessToken}`);
    //   }

    //   return headers;
    // },
  }),
  //   tagTypes: ["Posts"], // Used for Caching
  endpoints: (builder) => ({
    postSignUp: builder.mutation<AuthSignUpResponse, AuthSignUpInput>({
      query: ({ email, password, firstName, lastName }) => ({
        url: `/signup`,
        method: "POST",

        body: { email, password, firstName, lastName },
      }),
      //   invalidatesTags: ["Posts"],
    }),
    postLogin: builder.mutation<AuthLoginResponse, AuthLoginInput>({
      query: ({ email, password }) => ({
        url: `/login`,
        method: "POST",

        body: { email, password },
      }),
      //   invalidatesTags: ["Posts"],
    }),
  }),
});

export const { usePostSignUpMutation, usePostLoginMutation } = authApi;
