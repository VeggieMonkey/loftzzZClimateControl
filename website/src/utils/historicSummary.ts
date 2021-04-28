import { average } from "./average";
import min from "lodash/min";
import max from "lodash/max";

import { transformLogsToProcessableFormat } from "./transformLogsToProcessableFormat";
import { LogFirebase } from "../hooks";
import { currentLogKeys } from "./keys";

// a group of logs into summary format
export const historicSummary = (logs: LogFirebase) => {
  const generalForm = transformLogsToProcessableFormat(logs);

  const historicSummary = currentLogKeys.reduce((result, logType) => {
    const logs = generalForm[logType];
    const totals = {
      avg: average(logs),
      min: min(logs),
      max: max(logs),
    };

    return {
      ...result,
      [logType]: totals,
    };
  }, {});

  return historicSummary;
};
