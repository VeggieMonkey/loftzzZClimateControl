import React from "react";
import { TimeSeries } from "pondjs";

import { Loading } from "../common/Loading";
import { useLogs } from "../hooks/useLogs";
import { Log } from "../hooks/types";
import { DragChart } from "../common/DragChart";

// Data
type DataFormart = [Date, any];
type Requests = DataFormart[];
type Connections = DataFormart[];
const requests: Requests = [];
const connections: Connections = [];

export const Logs2 = () => {
  const { data, isLoading } = useLogs();
  // const { data, isLoading }: { data: Log; isLoading: boolean } = {
  //   data: [],
  //   isLoading: false,
  // };

  if (isLoading) {
    return <Loading />;
  }

  // console.log("data", data);

  if (!data) {
    return <div>No data found.</div>;
  }

  const showLast = 5000;
  const allData = Object.entries(data);
  const length = allData.length;
  const truncatedData = allData.slice(length - showLast, length);

  truncatedData.forEach((value) => {
    // const readingDate = Number(`${value[0]}000`);
    const readingDate = new Date(Number(`${value[0]}000`));
    console.log("readingDate", readingDate);

    if (Number(value[1].voc) > 0) {
      requests.push([readingDate, value[1].co2]);
    }

    if (Number(value[1].voc) < 600) {
      connections.push([readingDate, value[1].voc]);
    }
  });

  const requestsSeries = new TimeSeries({
    name: "Co2",
    columns: ["time", "requests"],
    points: requests,
  });

  const connectionsSeries = new TimeSeries({
    name: "VoC",
    columns: ["time", "connections"],
    points: connections,
  });

  return (
    <div className="App">
      Logs: {Object.keys(data).length}
      {/* <DragChart
        connectionsSeries={connectionsSeries}
        requestsSeries={requestsSeries}
      /> */}
    </div>
  );
};
