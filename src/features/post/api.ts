import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "./types";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://frontend-test-be.stage.thinkeasy.cz",
  }),
  tagTypes: ["Posts"], // Used for Caching
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `/posts`,
      providesTags: ["Posts"],
    }),
  }),
});

export const { useGetPostsQuery } = postApi;