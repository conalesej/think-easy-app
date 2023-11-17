import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider } from "@chakra-ui/react";

import { Provider } from "react-redux";
import { store } from "./store.ts";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
