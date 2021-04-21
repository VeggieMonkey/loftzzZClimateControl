import { LogFirebase } from "../hooks";

export const aggregateLogs = (
  logs: LogFirebase,
  startFromTimestamp: number,
  customGroupSize?: number
) => {
  //    millisecond key:   h    m    s   ms
  const defaultGroupSize = 1 * 60 * 60 * 1000; // 1 hour
  const archiveIntoChunksOf = customGroupSize || defaultGroupSize;

  // console.log("-Window increment size:", archiveIntoChunksOf);

  const initialResult: LogFirebase[] = [{}];

  let currentWindow = startFromTimestamp + archiveIntoChunksOf;

  const logsBrokenIntoTimeChunks = Object.entries(logs).reduce(
    (result, [timestamp, value]) => {
      // console.log("---");

      const currentTimestamp = Number(timestamp);
      // console.log("Processing:", currentTimestamp);
      // console.log("Current window max:", currentWindow);

      let itemsToAdd: LogFirebase[] = [];

      if (currentTimestamp > currentWindow) {
        // console.log("Incrementing window");
        // need to add loop breakout saftey incase there are huge gaps?
        while (currentTimestamp > currentWindow) {
          itemsToAdd.push({});
          // increment to next window
          currentWindow += archiveIntoChunksOf;
          // console.log("New window max:", currentWindow);
        }
      }

      const newResults = [...result, ...itemsToAdd];

      const lastItem = newResults[newResults.length - 1];
      // put the log into the last group
      lastItem[currentTimestamp] = value;

      return newResults;
    },
    initialResult
  );

  return logsBrokenIntoTimeChunks;
};
