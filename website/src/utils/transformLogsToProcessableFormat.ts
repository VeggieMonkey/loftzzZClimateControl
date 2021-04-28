/*
 *
 * Get the average of a list of logs
 *
 */

import { LogFirebase } from "../hooks";
import { currentLogKeys } from "./keys";

/*
* Convert logs into processable format
*

123: {
  co2: 1,
  voc: 2,
},
456: {
  co2: 3,
  voc: 4,
}

->

co2: [1, 3],
voc: [2, 4]

*
*/

const doThingForKeys = (thing: (key: string) => any) => {
  return currentLogKeys.reduce((result, key) => {
    return {
      ...result,
      [key]: thing(key),
    };
  }, {});
};

export const transformLogsToProcessableFormat = (logs: LogFirebase) => {
  const initialAggregatedLogs: Record<
    string,
    number[]
    // eg, this makes: {co2: [], voc: []}
  > = doThingForKeys(() => []);

  const totals = Object.keys(logs).reduce((result, timestamp) => {
    const log = logs[(timestamp as unknown) as number];

    return doThingForKeys((key: string) => [...result[key], log[key]]);
  }, initialAggregatedLogs);

  // console.log("totals", totals);
  return totals;
};
