import { transformLogsToProcessableFormat } from "../src/utils/transformLogsToProcessableFormat";

import { log1 } from "../fixtures";

describe("transformLogsToProcessableFormat", () => {
  it("should process good case", () => {
    const result = transformLogsToProcessableFormat(log1);
    expect(result.co2).to.have.ordered.members([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(result.voc).to.have.ordered.members([
      10,
      11,
      11,
      12,
      12,
      13,
      14,
      14,
      12,
      10,
    ]);
  });
});
