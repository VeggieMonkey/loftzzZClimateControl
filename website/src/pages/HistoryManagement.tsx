import React from "react";
import {
  Title,
  Table,
  TableActions,
  TableRow,
  ProcessIcon,
  TableRows,
} from "../common";

import { Loading } from "../common/Loading";
import { useFirstLog, useLogs, useLogsForRange } from "../hooks/useLogs";
import { aggregateLogs } from "../utils/aggregateLogs";

export const HistoryManagement = () => {
  const { data, isLoading } = useFirstLog();

  if (isLoading) {
    return <Loading />;
  }

  console.log("data", data);

  if (!data) {
    return <div>No data found.</div>;
  }

  // get the first log

  // get the hour of a log
  // const hourOfFirstLog = getHourOfFirstLog(firstLog);

  let start = 0;
  let end = 0;

  return (
    <>
      <LoadLogs start={start} end={end} />
    </>
  );
};

const LoadLogs: React.FC<{ start: number; end: number }> = ({ start, end }) => {
  const { data, isLoading } = useLogsForRange(start, end);

  if (isLoading) {
    return <Loading />;
  }

  // console.log("data", data);

  if (!data) {
    return <div>No data found.</div>;
  }

  // const allData = aggregateLogs(data, hourOfFirstLog);

  return (
    <>
      <Title>Historic log managment</Title>
      <HistoricData />
    </>
  );
};

const HistoricData = () => {
  const columns = [{ name: "Date", align: "center" }];
  let rows: TableRows = [];
  rows = [[{ data: "123" }]];

  // rows = allDataForUser.reduce((result, userLog) => {
  // // don't show data without the right fields
  // if (!userLog.data || !userLog.created) {
  //   return result;
  // }

  // const newRow: TableRow[] = [
  //   { data: userLog.created.date },
  //   { data: userLog.isProcessed ? "Yes" : "No" },
  // ];
  //   return [...result, newRow];
  // }, rows);

  const actions: TableActions = [
    {
      name: "Process",
      renderIcon: () => <ProcessIcon />,
      action: async (rowId) => {
        console.log("Process:", rows[rowId]);
      },
    },
  ];

  return <Table actions={actions} columns={columns} data={rows} />;
};
