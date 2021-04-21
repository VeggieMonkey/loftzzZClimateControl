import sum from "lodash/sum";

import type { Data } from "../hooks";

export const average = (list: Data) => {
  return sum(list) / list.length;
};
