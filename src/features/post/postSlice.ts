import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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
});

export const { increment } = postSlice.actions;

export default postSlice.reducer;
