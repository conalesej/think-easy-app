import React, { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { TopBar } from "./components/organisms";
import { persistor } from "./store";

interface ILayout {
  children: ReactNode;
}
const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <TopBar />
      {children}
    </PersistGate>
  );
};

export default Layout;
