import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post, PostInput } from "./types";
import { RootState } from "../../store";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL_POSTS,
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the access token from wherever you have stored it
      const accessToken = (getState() as RootState).auth.authTokens.accessToken;

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
    getPost: builder.query<Post, string>({
      query: (postId: string) => `/${postId}`,
      providesTags: ["Posts"],
    }),
    getPostsByUserId: builder.query<Post[], string>({
      query: (authorId: string) => `/user/${authorId}`,
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

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostsByUserIdQuery,
  usePostPostsMutation,
} = postApi;
