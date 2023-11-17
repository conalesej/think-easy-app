import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, PostInput } from "./types";
import { RootState } from "../../store";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://frontend-test-be.stage.thinkeasy.cz/posts",
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the access token from wherever you have stored it
      // const accessToken = (getState() as RootState).auth.authTokens.accessToken;
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHAyYW9zemcwMDBkbWk3bTY0YW55bWoyIiwiaWF0IjoxNzAwMjA4Mjc4LCJleHAiOjE3MDAyMDkxNzh9.3eChiL-L_ozbaU6USN6tFAO9TLPSilTMTi2SH33dsPg";
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Posts"], // Used for Caching
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `/`,
      providesTags: ["Posts"],
    }),
    postPosts: builder.mutation<any, PostInput>({
      query: ({ title, content, published }) => ({
        url: `/`,
        method: "POST",
        body: { title, content, published, author: {} },
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const { useGetPostsQuery, usePostPostsMutation } = postApi;
