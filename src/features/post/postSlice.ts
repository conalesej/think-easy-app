import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { postApi } from "./api";
import { Post } from "./types";

export interface PostState {
  currentPost: Post;
  posts: Post[];
}

const initialState: PostState = {
  currentPost: {
    id: "",
    title: "",
    content: "",
    published: false,
    createdAt: "",
    updatedAt: "",
    authorId: "",
  } as Post,
  posts: [] as Post[],
};

export const postSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Write shit here
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postApi.endpoints.getPosts.matchFulfilled,
      (state, action) => {
        const { payload } = action;
        state.posts = payload;
      }
    );
  },
});

export const { increment } = postSlice.actions;

export default postSlice.reducer;
