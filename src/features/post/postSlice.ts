import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Post, PostResponse } from "./types";

export interface PostState {
  currentPost: Post;
  posts: PostResponse[];
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
  posts: [] as PostResponse[],
};

export const postSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Write shit here
    },
  },
});

export const { increment } = postSlice.actions;

export default postSlice.reducer;
