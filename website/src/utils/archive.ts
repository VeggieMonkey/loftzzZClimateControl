import { aggregateLogs } from "./aggregateLogs";

export const archive = () => {
  //    millisecond key:      h    m    s   ms
  const archiveIntoChunksOf = 1 * 60 * 60 * 1000; // 1 hour

  // get logs for a period of
  const startTime = 0;
  const endTime = 0;

  // fetch logs

  // break logs down into achive chunk size
  const aggregates = aggregateLogs();

  // do historicSummary

  // save
};
