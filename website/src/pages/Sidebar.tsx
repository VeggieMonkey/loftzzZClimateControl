import React from "react";

import { NavBar } from "../common";
import { pages } from "./pages";

export const Sidebar: React.FC = ({ children }) => {
  const renderTopBarRight = ({ handleClick }: { handleClick: () => void }) => {
    return <></>;
  };

  return (
    <NavBar
      title="House Environment Controls and Charts"
      leftPages={pages.map((page) => ({
        name: page.name,
        route: page.route,
        icon: page.icon,
      }))}
      renderTopBarRight={renderTopBarRight}
    >
      {children}
    </NavBar>
  );
};
