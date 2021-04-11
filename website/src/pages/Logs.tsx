import React from "react";
import { Loading } from "../common/Loading";
import { LineGraph, LineOnGraph } from "../common/LineGraph";

import { useLogs } from "../hooks/useLogs";
import { BrushGraph } from "../common/BrushGraph";
import { Log } from "../hooks/types";

export const Logs = () => {
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

  const initialConfig: LineOnGraph[] = [
    {
      data: [],
      name: "Co2",
    },
    {
      data: [],
      name: "VoC",
    },
  ];

  const showLast = 50;
  const allData = Object.entries(data);
  const length = allData.length;
  const truncatedData = allData.slice(length - showLast, length);

  const config = truncatedData.reduce((result, value) => {
    const readingDate = new Date(Number(`${value[0]}000`));

    if (Number(value[1].voc) > 0) {
      result[0].data.push({
        x: readingDate,
        y: value[1].co2,
      });
    }

    if (Number(value[1].voc) < 60000) {
      result[1].data.push({
        x: readingDate,
        y: value[1].voc,
      });
    }

    return result;
  }, initialConfig);

  const configCo2 = [config[0]];
  // console.log("configCo2", configCo2);
  const configVoc = [config[1]];
  // console.log("configVoc", configVoc);

  return (
    <div className="App">
      Logs: {Object.keys(data).length}
      <LineGraph config={configCo2} labelX="time" />
      <LineGraph config={configVoc} labelX="time" />
      <BrushGraph />
    </div>
  );
};
