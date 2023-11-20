import { createSlice } from "@reduxjs/toolkit";
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
    increment: () => {},
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postApi.endpoints.getPosts.matchFulfilled,
      (state, action) => {
        const { payload } = action;
        const sortedArray = payload.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA;
        });
        state.posts = sortedArray;
      }
    );
  },
});

export const { increment } = postSlice.actions;

export default postSlice.reducer;
