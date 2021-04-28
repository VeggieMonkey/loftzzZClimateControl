import React from "react";

import { Loading } from "../common/Loading";
import { useLogs } from "../hooks/useLogs";
import { SimpleTimeSeries } from "../common/FusionGraph";
import { displayDate } from "../utils/date";

// Data
type DataFormat = [string, any, any];

export const Logs = () => {
  const { data, isLoading } = useLogs({ limit: 500 });

  if (isLoading) {
    return <Loading />;
  }

  // console.log("data", data);

  if (!data) {
    return <div>No data found.</div>;
  }

  const allData = Object.entries(data);
  const processedData: DataFormat[] = [];

  allData.forEach((value) => {
    const readingDate = displayDate(Number(value[0]) * 1000);

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
