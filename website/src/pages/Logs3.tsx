import React from "react";

import { Loading } from "../common/Loading";
import { useLogs } from "../hooks/useLogs";
import { Log } from "../hooks/types";
import { SimpleTimeSeries } from "../common/FusionGraph";
import dayjs from "dayjs";

// Data
type DataFormat = [string, any, any];

export const Logs3 = () => {
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

  const showLast = 10000;
  const allData = Object.entries(data);
  const length = allData.length;
  const truncatedData = allData.splice(length - showLast, length);
  // const truncatedData = Object.entries(data);
  const processedData: DataFormat[] = [];

  truncatedData.forEach((value) => {
    const readingDate = dayjs(Number(value[0]) * 1000).format(
      "DD/MM/YYYY H:m:s"
    );
    // const readingDate = Number(`${value[0]}`);
    // const readingDate = Number(`${value[0]}000`);
    // const readingDate = new Date(Number(`${value[0]}000`));

    if (Number(value[1].co2) === 0) {
      return;
    }

    if (Number(value[1].voc) > 10000) {
      return;
    }

    processedData.push([readingDate, value[1].co2, value[1].voc]);
  });

  return (
    <div className="App">
      Logs: {Object.keys(data).length}
      <SimpleTimeSeries data={processedData} />
    </div>
  );
};
