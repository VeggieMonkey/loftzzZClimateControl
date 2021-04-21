import { GraphIcon, FanIcon, HistoryIcon } from "../common";
import { Logs } from "./Logs";
import { Fan } from "./Fan";
import { HistoryManagement } from "./HistoryManagement";

interface Page {
  Component: React.FC;
  route: string;
  name: string;
  icon: React.ReactElement | React.ReactNode;
}

export const pages: Page[] = [
  {
    Component: Logs,
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
  {
    Component: HistoryManagement,
    route: "/history",
    name: "History",
    icon: HistoryIcon,
  },
];
