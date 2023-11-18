import React, { ReactNode } from "react";
import { TopBar } from "./components/organisms";

interface ILayout {
  children: ReactNode;
}
const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
};

export default Layout;
