import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider } from "@chakra-ui/react";

import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./store.ts";
import { ToastContainer } from "react-toastify";

import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Login, PostPage, SignUp, UserPosts } from "./components/organisms/";
import Layout from "./Layout.tsx";
import ErrorComponent from "./Error.tsx";

const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const authToken = useSelector((state: RootState) => state.auth.authTokens);
  const locationPath = useLocation().pathname;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authToken.accessToken) {
      navigate("/login");
    } else {
      if (locationPath === "/login") navigate("/");
    }
  }, []);

  return <>{element}</>;
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Layout>
          <App />
        </Layout>
      ),
      errorElement: (
        <Layout>
          <ErrorComponent />
        </Layout>
      ),
    },

    {
      path: "/posts/:id",
      element: (
        <Layout>
          <ProtectedRoute element={<PostPage />} />
        </Layout>
      ),
    },
    {
      path: "/users/:id/posts",
      element: (
        <Layout>
          <ProtectedRoute element={<UserPosts />} />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: <ProtectedRoute element={<Login />} />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/think-easy-app/" }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ChakraProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </ChakraProvider>
  </Provider>
);
