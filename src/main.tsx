import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from "react-redux";
import { store } from "./store.ts";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PostPage, UserPosts } from "./components/organisms/";
import Layout from "./Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },

  {
    path: "/posts/:id",
    element: (
      <Layout>
        <PostPage />
      </Layout>
    ),
  },
  {
    path: "/users/:id/posts",
    element: (
      <Layout>
        <UserPosts />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
