import { GraphIcon, FanIcon } from "../common";
import { Logs3 } from "./Logs3";
import { Fan } from "./Fan";

interface Page {
  Component: React.ReactElement | React.ReactNode;
  route: string;
  name: string;
  icon: React.ReactElement | React.ReactNode;
}

export const pages: Page[] = [
  {
    Component: Logs3,
    route: "/logs",
    name: "Graphs",
    icon: GraphIcon,
  },
  {
    Component: Fan,
    route: "/fan",
    name: "Fan",
    icon: FanIcon,
  },
];
